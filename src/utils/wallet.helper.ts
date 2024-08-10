/* eslint-disable no-console */
/* eslint-disable indent */

export function shortenAddress(address: string = "", length: number = 4) {
  return address && `${address.slice(0, 6)}...${address.slice(Math.max(0, address.length - length))}`;
}
