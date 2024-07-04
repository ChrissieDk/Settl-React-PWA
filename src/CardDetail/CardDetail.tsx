import { Token } from "../types/Types";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokens: Token[];
}

const CardModal: React.FC<CardModalProps> = ({ isOpen, onClose, tokens }) => {
  if (!isOpen) return null;
  console.log("Modal rendered with tokens:", tokens);

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-70 overflow-y-auto h-full w-full z-10"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            My Cards
          </h3>
          <div className="mt-2 px-7 py-3 z-50">
            {tokens.length > 0 ? (
              tokens.map((token, index) => (
                <div key={index} className="mb-4 p-4 border rounded text-left">
                  <p>Name: {token.additionalPaymentTokenInformation}</p>
                  <p>Type: {token.paymentInstrumentType}</p>
                  <p>Association: {token.paymentInstrumentAssociationName}</p>
                  <p>Card Number: {token.truncatedPaymentInstrument}</p>
                  <p>Expiry Date: {token.paymentInstrumentExpiryDate}</p>
                  <p>
                    Status:{" "}
                    {token.paymentTokenStatus === "00" ? "Active" : "Inactive"}
                  </p>
                </div>
              ))
            ) : (
              <p>No cards found.</p>
            )}
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
