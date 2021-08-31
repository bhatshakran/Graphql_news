import { toast } from "react-toastify";

const toastHandler = (value, style) => {
  if (typeof value === "string") {
    toast(value, {
      type: toast.TYPE[style],
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  } else {
    for (const item of value) {
      toast(item.message, {
        type: toast.TYPE[style],
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }
};

export default toastHandler;
