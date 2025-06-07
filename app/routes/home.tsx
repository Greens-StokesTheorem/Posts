import { Welcome } from "../welcome/welcome";

export function meta({}) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }) {
  return { message: context.VALUE_FROM_EXPRESS };
}

export default function Home({ loaderData }) {
  return <Welcome message={loaderData.message} />;
}
