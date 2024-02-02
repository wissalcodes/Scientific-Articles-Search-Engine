// component to display error messages
export default function ErrorMessage({ message }) {
  return (
    <p className="px-[10px] text-[red] text-[11px] text-start lg:text-[15px]">
      {message}
    </p>
  );
}
