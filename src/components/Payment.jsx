import { useParams } from "react-router";
import { useState } from "react";

const Payment = () => {
  const { planName } = useParams();
  const [activeTab, setActiveTab] = useState("upi");
  return (
    <div className="w-full min-h-screen pb-12 pt-22 flex justify-center items-center">
      <div className="w-[90%] md:w-[80%] h-[90%] md:h-[500px] border border-black flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-[300px] md:h-full bg-orange-600 p-6 text-white relative">
          <h1 className="text-5xl font-semibold mb-2">
            {planName.toUpperCase()}
          </h1>
          <h2>Plan Selected.</h2>
          <div className="absolute bottom-8 ">
            <h4 className="text-sm text-gray-100">Price</h4>
            <h1 className="text-4xl">$100</h1>
            <h4 className="text-xs opacity-80 mt-2">
              One-time Payment, 3-year access{" "}
            </h4>
          </div>
        </div>
        <div className="w-full md:w-1/2 min-h-[300px] md:h-full p-6">
          <h1 className="text-2xl font-medium mb-6">Payment Details</h1>
          <div class="flex space-x-3 mb-6 border-b">
            {["upi", "wallets"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-btn py-2 px-4 font-medium border-b-2 transition ${
                  activeTab === tab
                    ? "border-black"
                    : "border-transparent hover:text-black-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "upi" && (
            <form>
              <label className="block text-sm font-medium mb-2">
                Enter UPI ID
              </label>
              <input
                type="text"
                placeholder="username@upi"
                className="w-full px-4 py-2 border focus:outline-none"
                required
              />
              <button className="w-full mt-4 py-3 bg-[#386641] text-[#FFFDF6] font-semibold cursor-pointer">
                Pay via UPI
              </button>
            </form>
          )}

          {activeTab === "wallets" && (
            <div className="space-y-3">
              {[
                {
                  name: "Google Pay",
                  logo: "https://static.dezeen.com/uploads/2025/05/sq-google-g-logo-update_dezeen_2364_col_0.jpg",
                },
                {
                  name: "PhonePe",
                  logo: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2023/06/phonepe-1686727535.jpg",
                },
                {
                  name: "Paytm",
                  logo: "https://1000logos.net/wp-content/uploads/2021/03/Paytm_Logo.jpg",
                },
              ].map((wallet) => (
                <button
                  key={wallet.name}
                  className="w-full flex items-center justify-between px-4 py-3 border  hover:bg-[#386641] hover:text-white transition cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <img src={wallet.logo} alt={wallet.name} className="h-6" />
                    <span className="font-medium">{wallet.name}</span>
                  </div>
                  <span className=" font-semibold">Pay</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
