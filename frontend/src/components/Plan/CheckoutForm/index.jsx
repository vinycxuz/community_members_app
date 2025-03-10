import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { paymentIntent } from "../../../API/stripe/stripeAPI";
import { useMutation } from "@tanstack/react-query";

import AlertMessage from "../../Alert/AlertMessage";

const CheckoutForm = () => {
  const { planId } = useParams();
  console.log(planId);

  const checkoutMutation = useMutation({
    mutationKey: ['checkout'],
    mutationFn: paymentIntent,
  })

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  console.log(checkoutMutation.data?.clientSecret)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(elements === null) {
      return;
    }
    const {error: submitErr} = await elements.submit();
    if(submitErr) {
      return;
    }
    try {
      checkoutMutation
      .mutateAsync(planId)
      .then(async () => {
        const { error } = await stripe.confirmPayment({
          elements,
          clientSecret: checkoutMutation.data?.clientSecret,
          confirmParams: {
            return_url: 'http://localhost:5173/success',
          },
        })
        setErrorMessage(error?.message);
      })
        .catch((error) => {
          setErrorMessage(error?.message)
        })
    } catch (error) {
      setErrorMessage(error?.message)
    }
  }

  console.log(checkoutMutation);
  return (
    <div className="h-screen -mt-4 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-96 mx-auto my-4 p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4"> 
          <PaymentElement /> 
        </div>
        {checkoutMutation?.isPending && (
          <AlertMessage type="loading" message="Proccessing please wait..." />
        )}

        {checkoutMutation?.isError && (
          <AlertMessage
            type="error"
            message={checkoutMutation?.error?.response?.data?.message}
          />
        )}
        <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Pagar
        </button>
        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )} 
      </form>
    </div>
  );
};

export default CheckoutForm;