import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { ROUTE_PATHS } from "../../constants/routes";
import { clearCart } from "../../slicer/cart/cart.actions";
import { checkUserSession } from "../../slicer/user/user.actions";

const BuySuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearCart());
    dispatch(checkUserSession());
    navigate(ROUTE_PATHS.HOME, { state: { buySuccess: true } });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default BuySuccess;
