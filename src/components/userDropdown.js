import React, {useState, useEffect}from "react";
import { Link } from "react-router-dom";




function UserDropdown() {
    //GET ACCOUNT_ID COOKIE
    const cookie = document.cookie;
    function getAcctIdFromCookie (cookieStr) {
        //if browser has more than one cookie, the if statement will run
        if (cookieStr.indexOf(';') > 0) {
            //document.cookie is a string. We use .split() to convert it to an array with each cookie being an element
            const cookiesArray = cookieStr.split(';');
            for(let i = 0; i < cookiesArray.length; i++) {
                if (cookiesArray[i].indexOf('account_id') > 0) {
                    //find the cookie with 'account_id' substring
                    const id = cookiesArray[i].replace('account_id=', '').trim();
                    // console.log(id)
                    return id;
                }
            }
        }
        else {
            const id = cookie.slice(cookie.indexOf('=')+1);
            // console.log(id)
            return id;
        }
    }
    const accountId = getAcctIdFromCookie(cookie);
    
    const [userData, setUserData] = useState([]);

    
    useEffect(() => {
        fetch(`/api/profile/${accountId}`)
        .then((res) => res.json())
        .then((userData) => {
            setUserData(userData);
        });
    }, [accountId]);

    const {first_name, email} = userData[0] || {};

    function removeCookie() {
        document.cookie = "account_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setTimeout(() => {
          window.location.reload();
        }, 0);
      }
      


    return (
        <div id="userDropdown" className="pointer-events-none absolute right-0 top-12 z-50 w-64 translate-y-2 rounded-lg border border-[#e6e0d8] bg-white pb-1 opacity-0 shadow-xl transition duration-200 ease-out">
            <div className="flex justify-start items-start px-5 flex-col py-4 border-b border-[#e6e0d8]">
                <div className="text-lg font-black text-[#232323]">{first_name}</div>
                <div className="text-xs font-semibold text-[#697586]">{email}</div>
            </div>
            <div className="flex justify-start flex-col p-2 items-stretch">
                <Link to="/user/profile" className="block rounded-md px-3 py-2 text-sm font-bold text-[#46515f] transition hover:bg-[#f3ebe1] hover:text-[#b85c6b]">Your Profile</Link>
                <Link to="/orders" className="block rounded-md px-3 py-2 text-sm font-bold text-[#46515f] transition hover:bg-[#f3ebe1] hover:text-[#b85c6b]">Orders</Link>
                {/* <Link to="/user/settings" className="block py-2 text-sm text-gray-700 hover:font-bold">Settings</Link> */}
                <Link to="/" onClick={removeCookie} className="block rounded-md px-3 py-2 text-sm font-bold text-[#46515f] transition hover:bg-[#f3ebe1] hover:text-[#b85c6b]">Sign out</Link>
            </div>
        </div>
    );
}

export function userDropdown() {
    var element = document.getElementById("userDropdown");
    if (element.classList.contains("opacity-100")) {
        element.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
        element.classList.add("opacity-0", "translate-y-2", "pointer-events-none");
    }
    else {
        element.classList.remove("opacity-0", "translate-y-2", "pointer-events-none");
        element.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
    }
}



export default UserDropdown;
