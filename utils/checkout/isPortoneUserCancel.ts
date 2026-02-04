const CANCEL_PATTERNS = [
  "사용자가결제를취소하였습니다", // 네이버페이
  "결제포기사용자가결제를취소하셨습니다", // 카카오페이/NHN
];

function normalize(s: string) {
  return (
    s
      .toLowerCase()
      // 공백/괄호/구두점/하이픈 등 제거
      .replace(/[\s\[\]\.\,\!\-\_\:]/g, "")
  );
}

/**
 * 포트원(Iamport) 에러 메시지가 사용자 취소인지 확인하는 함수
 * @param errorMsg - 포트원 error_msg 필드
 * @returns 사용자가 결제를 취소했는지 여부
 */
export function isPortoneUserCancel(errorMsg?: string): boolean {
  if (!errorMsg) return false;

  const norm = normalize(errorMsg.trim());
  return CANCEL_PATTERNS.some((p) => norm.includes(p));
}
