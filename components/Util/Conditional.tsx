import { ReactNode } from 'react';

export default function Conditional({ showWhen, children }: { showWhen: boolean, children: ReactNode }) {
  if (showWhen) return <>{children}</>;
  return <></>;
}
