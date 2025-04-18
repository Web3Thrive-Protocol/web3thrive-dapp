export const parseContractError = (error) => {
    if (error?.cause?.reason) {
      return error.cause.reason;
    }
  
    if (error?.shortMessage) {
      return error.shortMessage;
    }
  
    if (error?.message) {
      return error.message;
    }
  
    return "Something went wrong";
  };
  