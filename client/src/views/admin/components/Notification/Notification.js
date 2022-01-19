import React,{useEffect} from "react";
import NotificationAlert from "react-notification-alert";

function Notifications({details}) {
  const notificationAlertRef = React.useRef(null);
  const notify = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            {details.msg} {details.change==="NCM"? " - No Changes Made": null}
          </div>
        </div>
      ),
      type: details.type,
      icon: details.icon?details.icon:"now-ui-icons ui-1_bell-53",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  
  useEffect(() => {
      notify('tr');
  }, [details]);
  
  return (
    <>
        <NotificationAlert ref={notificationAlertRef} />
    </>
  );
}

export default Notifications;
