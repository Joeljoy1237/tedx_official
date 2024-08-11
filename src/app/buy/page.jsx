"use client"
import Script from 'next/script'
import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react'

export default () => {
    const [count, setCount] = useState(1);
    const [paymentId, setPaymentId] = useState("");
    const [offer, setOffer] = useState(null);
    const [lastPrice, setLastPrice] = useState(0);
    
    const { data: session, status } = useSession();


    useEffect(() => {
        const checkOfferStatus=() => {
            if (count > 10) {
                setOffer(()=>15);
            }
            else if (count >= 5) {
        setOffer(()=>10);
            }
            else {
                setOffer(()=>null);
            }
        }
        const checkLastPrice = () => {
            if (offer) {
                setLastPrice((1200 * count) - ((1200 * count) * (offer / 100)))
                return;
            }
            setLastPrice(1200*count)
}

        checkOfferStatus();
        checkLastPrice();
        console.log(session);

        if (status === "unauthenticated") {
            // Redirect to home page
            router.push("/login");
        }
    },[count,offer,status])

    
    const handleBuy = async () => {
        

        try {
            // Create a new payment insatnce in razor pay
            const response = await fetch("/api/payment/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    count: count,
                    offer: offer,
                    lastPrice: lastPrice,
                }),
            });
            const data = await response.json();
            console.log(data); // return the order is and the details of the patment
        
            const options = { //option for the payment window
                key: "rzp_test_PqOK3SguDXSVk6",
                amount: lastPrice*100,
                currency: "INR",
                name: "TEDxCCET",
                image:"",
                description: "Payment for tedxccet",
                order_id:data.id,
                handler: function (response) {
                    console.log(response);
                    alert("Payment sucessful")
                  setPaymentId(response.razorpay_payment_id)  
                },
                prefill: {
                    name: session?.user.name,
                    email:session?.user.email
                },
                theme: {
                    color:"#d70000"
                }

            }
//open razor pay window
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response){
        alert(response.error.description);
            })
            rzp1.open();
            

        } catch (err) {
            console.error(err)
        }

    }

// test to check the status of the payment using payment id
    const checkPayStatus = async() => {
        try {
            console.log(paymentId);
            
            const response = await fetch(`/api/payment/check/${paymentId}`)
            
            console.log(await response.json());
        } catch (err) {
            console.log(err);
            
}
    }

  return (
      <div>
          {/*script for razor pay */}
          <Script src="https://checkout.razorpay.com/v1/checkout.js" /> 
          <div onClick={()=>setCount(count+1)}>+</div>
          <input value={count} />
          <div onClick={()=>count>1?setCount(count-1):null}>-</div>
          <button onClick={handleBuy}>Buy now</button>
          <div></div>
          <button onClick={checkPayStatus}>try now</button>
          <div>Total price: {1200 * count} {offer && <div>Discount Price:{lastPrice }</div>} </div>
          { 
              offer && <div>You are eligible for {offer}% discount</div>

          }

          
          
          

    </div>
  )
}