import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import { Box, Typography } from "@mui/material";
import { i18n } from "../../../translations/i18n";
import ButtonForm from "../../../components/Button/ButtonFormik";
import Textfield from "../../../components/Inputs/TextFieldForm";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../slicer/types";
import { CartProduct } from "../../../slicer/cart/cart.types";
import { clearCart } from "../../../slicer/cart/cart.actions";
import { stripeLocal, stripeProduction } from "../../../constants/stripe";
import { updateSuccessNotification } from "../../../slicer/general/general.actions";
import SelectWrapper from "../../../components/Inputs/SelectFormValue";
import { countryList } from "../../../constants/forms";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface FormProps {
  name: string;
  address: string;
  address2: string;
  city: string;
  postCode: string;
  country: string;
  email: string;
  phone: string;
}

const CheckoutForm = () => {
  const INITIAL_FORM_STATE: FormProps = {
    name: "",
    address: "",
    address2: "",
    city: "",
    postCode: "",
    country: "",
    email: "",
    phone: "",
  };

  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState<boolean>(true);
  const [openInvoiceDetails, setOpenInvoiceDetails] = useState<boolean>(true)
  const [openPaymentMethods, setOpenPaymentMethods] = useState<boolean>(true)
  const cartProducts = useSelector<State, CartProduct[]>(
    (state) => state.cart.cartItems
  );



  const handleSubmitCard = async (values: FormProps) => {
    let items: {
      title: string;
      amount: number;
      quantity: number;
    }[] = [];

    cartProducts.forEach((item: CartProduct) => {
      items.push({
        title: `${item.product.title}-${item.product.collections}`,
        amount: item.product.price * 100,
        quantity: item.value,
      });
    });

    await fetch(stripeLocal, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, values }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.url) {
          dispatch(clearCart());
          dispatch(updateSuccessNotification(i18n.t("notifications.success.successBuy")));

          window.location.assign(res.url);
        }
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => setOpenForm(!openForm)}
      >
        <Typography
          style={{ textAlign: "left", fontSize: "24px", fontWeight: 800 }}
        >
          {i18n.t("modules.checkout.contactDetails")}
        </Typography>
        {openForm ? (
          <IoIosArrowUp size='1.5rem' />
        ) : (
          <IoIosArrowDown size='1.5rem' />
        )}
      </div>

      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        onSubmit={(values, { resetForm }) => {
          handleSubmitCard(values);
          resetForm();
        }}
        validationSchema={FORM_VALIDATION}
      >
        <Form>
          <>
            <Box
              rowGap={2}
              display='flex'
              flexDirection='column'
              sx={{ mt: "20px", pb: "20px" }}
            >
              {openForm && (
                <>
                  <Textfield label={i18n.t("forms.checkout.email")} name='email' />
                  <Textfield label={i18n.t("forms.checkout.phone")} name='phone' /></>)}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => setOpenInvoiceDetails(!openInvoiceDetails)}
              >
                <Typography
                  style={{ textAlign: "left", fontSize: "24px", fontWeight: 800 }}
                >
                  {i18n.t("modules.checkout.invoiceDetails")}
                </Typography>
                {openInvoiceDetails ? (
                  <IoIosArrowUp size='1.5rem' />
                ) : (
                  <IoIosArrowDown size='1.5rem' />
                )}
              </div>
              {openInvoiceDetails && (<> <Textfield label={i18n.t("forms.checkout.name")} name='name' />
                <SelectWrapper
                  options={countryList}
                  name='country'
                  label={i18n.t("forms.checkout.country")}

                />

                <Textfield label='Line 1' name='address' />
                <Textfield label='Line 2' name='address2' />
                <Textfield label={i18n.t("forms.city")} name='city' />
                <Textfield label={i18n.t("forms.postCode")} name='postCode' /></>)}



            </Box>
          </>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={() => setOpenPaymentMethods(!openPaymentMethods)}
          >
            <Typography
              style={{ textAlign: "left", fontSize: "24px", fontWeight: 800 }}
            >
              {i18n.t("modules.checkout.paymentMethods")}
            </Typography>
            {openPaymentMethods ? (
              <IoIosArrowUp size='1.5rem' />
            ) : (
              <IoIosArrowDown size='1.5rem' />
            )}
          </div>
          {openPaymentMethods && (<ButtonForm label={i18n.t("cartDrawer.buyNow")} />)}

        </Form>
      </Formik>

    </>
  );
};

export default CheckoutForm;
