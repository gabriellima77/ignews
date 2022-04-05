import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  activeClass: string;
  children: ReactElement;
}

export function ActiveLink({
  children,
  activeClass,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();
  const className = asPath === rest.href ? activeClass : '';

  return <Link {...rest}>{cloneElement(children, { className })}</Link>;
}
