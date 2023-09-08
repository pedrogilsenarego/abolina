import { Box, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import ButtonForm from "../../../components/Button";
import { Icons } from "../../../components/Icons";
import CheckBox from "../../../components/Inputs/CheckBox";
import SelectWrapper from "../../../components/Inputs/SelectFormValue";
import Textfield from "../../../components/Inputs/TextFieldForm";
import { countryList } from "../../../constants/forms";
import { Colors } from "../../../constants/pallette";
import { stripeLocal, stripeProduction } from "../../../constants/stripe";
import { clearCart } from "../../../slicer/cart/cart.actions";
import { CartProduct } from "../../../slicer/cart/cart.types";
import { updateSuccessNotification } from "../../../slicer/general/general.actions";
import { State } from "../../../slicer/types";
import { CurrentUser, InvoiceSettings } from "../../../slicer/user/user.types";
import { i18n } from "../../../translations/i18n";
import { FORM_VALIDATION } from "./validation";

interface FormProps extends InvoiceSettings {
  email: string;
  phone: string;
  userId: string;
}

const CheckoutForm = () => {
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state.user.currentUser
  );
  const INITIAL_FORM_STATE: FormProps = {
    email: currentUser?.email || "",
    phone: "",
    name: currentUser?.invoiceSettings?.name || "",
    surname: currentUser?.invoiceSettings?.surname || "",
    address: currentUser?.invoiceSettings?.address || "",
    city: currentUser?.invoiceSettings?.city || "",
    postalCode: currentUser?.invoiceSettings?.postalCode || "",
    country: currentUser?.invoiceSettings?.country || "",
    taxId: currentUser?.invoiceSettings?.taxId || "",
    userId: currentUser?.id,
  };

  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState<boolean>(true);
  const [openInvoiceDetails, setOpenInvoiceDetails] = useState<boolean>(true);
  const [openPaymentMethods, setOpenPaymentMethods] = useState<boolean>(true);
  const cartProducts = useSelector<State, CartProduct[]>(
    (state) => state.cart.cartItems
  );

  const handleSubmitCard = async (values: FormProps) => {
    let items: {
      title: string;
      amount: number;
      quantity: number;
      onlyOffer: boolean;
      documentId: string;
    }[] = [];

    cartProducts.forEach((item: CartProduct) => {
      items.push({
        title: `${item.product.title}-${item.product.collections}`,
        amount: item.product.price * 100,
        quantity: item.value,
        onlyOffer: item.onlyOffer,
        documentId: item.product.documentID,
      });
    });

    await fetch(stripeProduction, {
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
          //dispatch(clearCart());
          // dispatch(
          //   updateSuccessNotification(
          //     i18n.t("notifications.success.successBuy")
          //   )
          // );

          window.location.assign(res.url);
        }
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          padding: "0px 10px",
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
          <IoIosArrowUp size="1.5rem" />
        ) : (
          <IoIosArrowDown size="1.5rem" />
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
              display="flex"
              flexDirection="column"
              sx={{ mt: "20px", pb: "20px", padding: "0px 10px" }}
            >
              {openForm && (
                <>
                  <Textfield
                    label={i18n.t("forms.checkout.email")}
                    name="email"
                  />
                  <Textfield
                    label={i18n.t("forms.checkout.phone")}
                    name="phone"
                  />
                </>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => setOpenInvoiceDetails(!openInvoiceDetails)}
              >
                <Typography
                  style={{
                    textAlign: "left",
                    fontSize: "24px",
                    fontWeight: 800,
                  }}
                >
                  {i18n.t("modules.checkout.invoiceDetails")}
                </Typography>
                {openInvoiceDetails ? (
                  <IoIosArrowUp size="1.5rem" />
                ) : (
                  <IoIosArrowDown size="1.5rem" />
                )}
              </div>
              {openInvoiceDetails && (
                <>
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      columnGap: "20px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Textfield
                      style={{ width: "100" }}
                      label={i18n.t("modules.clientManagement.invoice.name")}
                      name="name"
                    />
                    <Textfield
                      style={{ width: "100" }}
                      label={i18n.t("modules.clientManagement.invoice.surname")}
                      name="surname"
                    />
                  </div>
                  <SelectWrapper
                    initialValue={currentUser?.invoiceSettings?.country || ""}
                    options={countryList}
                    name="country"
                    label={i18n.t("forms.checkout.country")}
                  />
                  <Textfield
                    label={i18n.t("modules.clientManagement.invoice.address")}
                    name="address"
                  />
                  <Textfield
                    label={i18n.t(
                      "modules.clientManagement.invoice.postalCode"
                    )}
                    name="postalCode"
                  />
                  <Textfield
                    label={i18n.t("modules.clientManagement.invoice.city")}
                    name="city"
                  />
                  <Textfield
                    label={i18n.t("modules.clientManagement.invoice.taxId")}
                    name="taxId"
                  />
                </>
              )}
            </Box>
          </>
          <div
            style={{
              display: "flex",
              marginTop: "60px",
              padding: "0px 10px",
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
              <IoIosArrowUp size="1.5rem" />
            ) : (
              <IoIosArrowDown size="1.5rem" />
            )}
          </div>
          {openPaymentMethods && (
            <div
              style={{
                marginTop: "60px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "end",
                rowGap: "30px",
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  border: `solid 2px ${Colors.grey}`,
                  padding: "0px 20px",
                }}
              >
                <CheckBox value={true} color={Colors.darkGrey} />
                <Icons.Stripe color={Colors.darkGrey} size="50px" />
              </div>
              <ButtonForm fullWidth formik label="Pay now" />
            </div>
          )}
        </Form>
      </Formik>
    </>
  );
};

export default CheckoutForm;
