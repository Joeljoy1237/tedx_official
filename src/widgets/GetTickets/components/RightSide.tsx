import React from "react";

interface RightSideProps {
  activeTab: "individual" | "group";
  subtotal: number;
  discount: number;
  student: boolean;
  isStudentChecked: boolean;
  setIsStudentChecked: React.Dispatch<React.SetStateAction<boolean>>;
  total: number;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  onBuy: () => Promise<void>;
}

const RightSide: React.FC<RightSideProps> = ({
  activeTab,
  subtotal,
  discount,
  setIsStudentChecked,
  isStudentChecked,
  student,
  total,
  isChecked,
  setIsChecked,
  onBuy,
}) => {
  // Determine whether the button should be enabled
  const isButtonEnabled = student ? isChecked && isStudentChecked : isChecked;

  return (
    <div className="md:flex-1 lg:flex-1 p-1 md:p-6 lg:p-6 flex-1 rounded-lg shadow-lg w-full md:mt-0 lg:mt-0 md:mb-0 lg:mb-0 mt-10 mb-10">
      <h3 className="text-lg font-semibold mb-4">
        {activeTab === "individual" ? "Individual Ticket" : "Group Ticket"}
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span className="font-semibold">₹{subtotal.toFixed(2)}/-</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-500">
            <span>Discount:</span>
            <span className="font-semibold">-₹{discount.toFixed(2)}/-</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}/-</span>
        </div>
      </div>
      <div className="flex flex-col mt-6 gap-4">
        {student && (
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isStudentChecked}
              onChange={(e) => setIsStudentChecked(e.target.checked)}
              className="form-checkbox"
            />
            <label htmlFor="student-id">I agree to bring my ID Card on visit</label>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="form-checkbox"
          />
          <label htmlFor="terms">I agree to the terms and conditions</label>
        </div>
        <button
          onClick={() => {
            setIsChecked(false);
            if (student) {
              setIsStudentChecked(false);
            }
            onBuy();
          }}
          disabled={!isButtonEnabled}
          className={`py-2 px-4 rounded-md font-semibold ${
            isButtonEnabled
              ? "bg-primary-700 text-white hover:bg-primary-800"
              : "bg-gray-400 cursor-not-allowed text-gray-700"
          } transition-colors`}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default RightSide;
