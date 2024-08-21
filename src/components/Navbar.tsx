import Link from 'next/link';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { bookings } = useCart();

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/checkout">Checkout ({bookings.length})</Link>
    </nav>
  );
};

export default Navbar;
