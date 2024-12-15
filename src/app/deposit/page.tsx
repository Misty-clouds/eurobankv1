import BackNavHeader from "@/lib/components/Backnav";
import InitiateDeposit from "@/lib/components/DepositForm";
export default function DepositPage() {
  
  return (
    <>
        <BackNavHeader />
      {/* Deposit Form */}
      <InitiateDeposit />
    </>
  );
}
