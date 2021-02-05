import React, {useEffect} from "react";
import "./Profile.css";
import userIcon from './assets/nfuser.jpg';
import {auth} from './firebase';
import {useStripe} from '@stripe/react-stripe-js';

function Profile({user}) {
	
	const stripe = useStripe();	
	const checkout = (priceId, e) => {
		e.preventDefault();
		fetch(`/api/create-checkout-session?priceId=${priceId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
		}).then((result) => result.json()).then((data) => {
			console.log(data);
			if (data.error) {
				console.log(data.error.message)
			} else {	
				stripe.redirectToCheckout({
					sessionId: data.sessionId,
					customerEmail: user.email,
				})
			}
		}).catch((err) => console.log(err));
	}

	
  return (
    <div className="profile">
    	<div className="profile__header">
<img src={user?.photoURL || userIcon} />
<h1>Hi, {user?.displayName}!</h1>
		<button className="signout" onClick={()=> auth.signOut()}>Sign Out</button>
</div>
<h3>Manage your subscription</h3>
<div className="packs">
	<div className="pack">
		<h3>Netflix Mobile</h3>
		<ul className="desc">
		<li>Mobile only</li>
		<li>480p SD Streaming</li>
		</ul>
		<p className="price">$ 19.99<small>/month</small></p>
		<button onClick={(e)=> checkout('price_1IHThZGVr4f6jXHSzK1GUgJd', e)}>Activate Now</button>
	</div>
	<div className="pack">
		<h3>Netflix Lite</h3>
		<ul className="desc">
		<li>Two screens</li>
		<li>480p SD Streaming</li>
		</ul>
		<p className="price">$ 29.99<small>/month</small></p>
		<button onClick={(e)=> checkout('price_1IHTmPGVr4f6jXHSav4jhyQg', e)}>Activate Now</button>
	</div>
	<div className="pack active">
		<h3>Netflix HD</h3>
		<ul className="desc">
		<li>Max 5 screens</li>
		<li>1080p HD Streaming</li>
		</ul>
		<p className="price">$ 39.99<small>/month</small></p>
		<button onClick={(e)=> checkout('price_1IHTs5GVr4f6jXHSID3JNFyr', e)}>Renews in 12 days</button>
	</div>
	<div className="pack">
		<h3>Netflix Premium</h3>
		<ul className="desc">
		<li>Unlimited screens</li>
		<li>4K UHD Streaming</li>
		</ul>
		<p className="price">$ 499.99<small>/year</small></p>
		<button onClick={(e)=> checkout('price_1IHTucGVr4f6jXHSbmX7mkFI', e)}>Activate Now</button>
	</div>
</div>
<p className="pack__info">All plans come with a 30 days FREE trial period. Cancel anytime.</p>
<button className="cancel">Cancel Subscription</button>
    </div>
  )
}
export default Profile;