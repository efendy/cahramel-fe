import Head from 'next/head';

interface IMetaHeader {
  title?: string;
  description?: string;
}

export const MetaHeader = ({title = 'caHRamel', description}: IMetaHeader) => {
  return (
    <Head>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
    </Head>
  );
};
