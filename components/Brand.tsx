import Image from 'next/image';
import Link from 'next/link';

export const repository = 'https://github.com/nicholasadamou/iconforge';
export default function Brand() {
  return (
    <Link href="/" className="brand" aria-label="IconForge / studio home">
      <Image src="/logo.svg" width="32" height="32" alt="" />
      <span>
        iconforge<span className="brand-sub"> / studio</span>
      </span>
    </Link>
  );
}
export function GithubLink() {
  return (
    <a href={repository} className="github-link">
      <i className="fa-brands fa-github" aria-hidden="true" />
      <span>GitHub</span>
    </a>
  );
}
