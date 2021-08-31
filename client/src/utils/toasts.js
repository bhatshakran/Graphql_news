import { toast } from "react-toastify";

const toastHandler = (value, style) => {
  if (typeof value === "string") {
    toast(value, {
      type: toast.TYPE[style],
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  } else {
   
    for (const item of value) {
      console.log(item);
      toast(item, {
        type: toast.TYPE[style],
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }
};

export default toastHandler;
