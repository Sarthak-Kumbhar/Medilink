class SendError extends Error {
  constructor(status,message,error){
    super(message)
    this.status = status
    this.error = error

    if(Error.captureStackTrace){
      Error.captureStackTrace(this,this,SendError);
    }
  }
}

export default SendError