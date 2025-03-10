const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto flex min-h-[calc(100dvh-68px)] w-full max-w-7xl flex-col'>
      {children}
    </div>
  );
};

export default BlogLayout;
