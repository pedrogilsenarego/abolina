export const mapInitialForm = (data: any) => {


  return {
    newBook: data?.newBook || "",
    discount: data?.discount || 0
  }

}