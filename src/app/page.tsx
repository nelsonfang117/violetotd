import Layout from './components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-violet-800">Welcome to VIOLETOTD</h1>
        <p className="mt-4 text-lg text-violet-600">
          This is your homepage with a reusable header and layout.
        </p>
      </div>
    </Layout>
  );
}