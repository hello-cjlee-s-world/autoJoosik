import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import tradeModalService from "@/app/services/tradeModalService.jsx";

export function TradeModal({ stock, cash = 0, onClose, onTrade }) {
  const [tradeType, setTradeType] = useState("buy");
  const [shares, setShares] = useState("");
  const [price, setPrice] = useState(
    stock?.curPrc?.toString()?.replace("+", "")?.replace("-", "") || "0"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // stock이 바뀌면 초기 가격도 따라가게 (모달을 재사용하는 경우)
  useEffect(() => {
    const nextPrice =
      stock?.curPrc?.toString()?.replace("+", "")?.replace("-", "") || "0";
    setPrice(nextPrice);
  }, [stock?.curPrc, stock?.stkCd]);

  if (!stock) return null;

  const sharesNum = useMemo(() => parseInt(shares, 10) || 0, [shares]);
  const priceNum = useMemo(() => parseInt(price, 10) || 0, [price]);
  const totalAmount = useMemo(
    () => sharesNum * priceNum,
    [sharesNum, priceNum]
  );

  const ownedShares = stock?.shares ?? 0;

  const canAfford =
    tradeType === "buy" ? totalAmount <= (cash ?? 0) : sharesNum <= ownedShares;

  const isValid = canAfford && sharesNum > 0 && priceNum > 0;

  const handleSubmit = async () => {
    setErrorMsg("");

    if (!isValid) {
      if (sharesNum <= 0) setErrorMsg("주문수량을 1 이상 입력하세요.");
      else if (priceNum <= 0) setErrorMsg("가격이 올바르지 않습니다.");
      else if (!canAfford) {
        setErrorMsg(
          tradeType === "buy"
            ? "보유현금이 부족합니다."
            : "보유수량을 초과할 수 없습니다."
        );
      }
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const api = tradeModalService();

      let response;
      if (tradeType === "buy") {
        // 안전하게 숫자로 넘김 (원래 shares 문자열 넘기면 서버에서 파싱 실패할 수도 있음)
        response = await api.stockBuy(stock.stkCd, sharesNum);
      } else {
        response = await api.stockSell(stock.stkCd, sharesNum);
      }

      // axios라면 response.status는 200/201 같은 숫자일 가능성이 큼.
      // response.data.status === "success" 같은 형태일 수도 있으니 콘솔 로그로 확인.
      const ok =
        response?.status === "success" ||
        response?.data?.status === "success" ||
        response?.data?.result === "success" ||
        response?.data?.success === true ||
        response?.status === 200 ||
        response?.status === 201;

      if (!ok) {
        const msg =
          response?.data?.message ||
          response?.message ||
          "주문 처리에 실패했습니다.";
        setErrorMsg(msg);
        return;
      }

      // onTrade는 너의 상위 컴포넌트 로직에 맞춰 유지
      // (원래 코드대로 symbol/name 쓰고 있었는데 stock 구조에 맞춰 조정 가능)
      onTrade?.(stock.symbol, sharesNum, priceNum, tradeType);
      onClose?.();
    } catch (err) {
      console.error("trade failed:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "주문 중 오류가 발생했습니다.";
      setErrorMsg(msg);
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSharesChange = (e) => {
    // 음수/소수 방지 + 빈 값 허용
    const v = e.target.value;
    if (v === "") return setShares("");
    const n = Number(v);
    if (Number.isNaN(n)) return;
    if (n < 0) return;
    setShares(String(Math.floor(n)));
  };

  const handlePriceChange = (e) => {
    const v = e.target.value;
    if (v === "") return setPrice("");
    const n = Number(v);
    if (Number.isNaN(n)) return;
    if (n < 0) return;
    setPrice(String(Math.floor(n)));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">주식 거래</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Stock Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="font-medium text-gray-900">
              {stock.symbol ?? stock.stkNm ?? stock.stkCd ?? "-"}
            </div>
            <div className="text-sm text-gray-500">
              {stock.name ?? stock.stkNm ?? ""}
            </div>
            <div className="mt-2 text-lg font-bold text-gray-900">
              ₩{Number(stock.curPrc ?? 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              보유수량: {Number(ownedShares).toLocaleString()}주
            </div>
          </div>

          {/* Trade Type */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTradeType("buy")}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                tradeType === "buy"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              disabled={isSubmitting}
            >
              매수
            </button>
            <button
              type="button"
              onClick={() => setTradeType("sell")}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                tradeType === "sell"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              disabled={isSubmitting}
            >
              매도
            </button>
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              주문가격
            </label>
            <input
              type="number"
              value={price}
              onChange={handlePriceChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="0"
              inputMode="numeric"
              disabled={true}
            />
          </div>

          {/* Shares Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              주문수량
            </label>
            <input
              type="number"
              value={shares}
              onChange={handleSharesChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="0"
              inputMode="numeric"
              disabled={isSubmitting}
            />
            {tradeType === "sell" && sharesNum > ownedShares && (
              <p className="mt-1 text-sm text-red-600">
                보유수량을 초과할 수 없습니다
              </p>
            )}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Total Amount */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">예상주문금액</span>
              <span className="font-bold text-gray-900">
                ₩{Number(totalAmount).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {tradeType === "buy" ? "보유현금" : "예상잔액"}
              </span>
              <span
                className={`text-sm ${
                  tradeType === "buy" && totalAmount > (cash ?? 0)
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                ₩
                {tradeType === "buy"
                  ? Number(cash ?? 0).toLocaleString()
                  : Number((cash ?? 0) + totalAmount).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button" // submit 말고 button이 안전 (form 없을 때 특히)
            disabled={isSubmitting || !isValid}
            onClick={handleSubmit}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              !isSubmitting && isValid
                ? tradeType === "buy"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting
              ? "주문 중..."
              : tradeType === "buy"
                ? "매수 주문"
                : "매도 주문"}
          </button>
        </div>
      </div>
    </div>
  );
}
