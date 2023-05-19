export const mapInitialForm = (data: any) => {


  return {
    newBook: data?.newBook || "",
    discount: data?.discount || 0,
    discountDigital: data?.discountDigital || 0,
    format: data?.format || []
  }

}