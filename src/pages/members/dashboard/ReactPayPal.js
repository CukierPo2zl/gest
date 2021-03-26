import React from "react";

export default function ReactPayPal(props) {
  const [paid, setPaid] = React.useState(false);
  const [error,] = React.useState(null);
  const paypalRef = React.useRef();

  // To show PayPal buttons once the component loads
  React.useEffect(() => {
    const price = props.price
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your description",
                amount: {
                  currency_code: "PLN",
                  value: price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaid(true);
          console.log(order);
        },
        onError: (err) => {
        //   setError(err),
          console.error(err);
        },
      })
      .render(paypalRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If the payment has been made
  if (paid) {
    return <div>Payment successful.!</div>;
  }

  // If any error occurs
  if (error) {
    return <div>Error Occurred in processing payment.! Please try again.</div>;
  }

  // Default Render
  return (
    <div>
      <center style={{margin:"30px", fontSize:30, fontWeight:'bold'}}>Do zapłaty: {props.price}$ </center>
      <div ref={paypalRef} />
    </div>
  );
}