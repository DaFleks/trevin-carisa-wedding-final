"use client";

import { AttendingStatus as Status } from "@prisma/client";
import { CheckIcon, CircleQuestionMark, XIcon } from "lucide-react";

const StatusCheck = ({ status }: { status: Status | boolean }) => {
  return (
    <>
      {typeof status === "boolean" ? (
        <>{status ? <CheckIcon className="text-emerald-600 mx-auto" /> : <XIcon className="text-rose-600 mx-auto" />}</>
      ) : (
        <>
          {status === "ATTENDING" && <CheckIcon className="text-emerald-600 mx-auto" />}
          {status === "NOTATTENDING" && <XIcon className="text-rose-600 mx-auto" />}
          {status === "PENDING" && <CircleQuestionMark className="mx-auto" />}
        </>
      )}
    </>
  );
};

export default StatusCheck;
