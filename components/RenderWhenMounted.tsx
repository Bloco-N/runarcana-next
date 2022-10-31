import React, { useEffect, useState } from 'react';

type RenderWhenMountedProps = {
  children: React.ReactNode
}

const RenderWhenMounted = (props:RenderWhenMountedProps) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => { setHasMounted(true) }, [])

  if(!hasMounted) return null

  return (
    <div>
      {props.children}
    </div>
  );
};

export default RenderWhenMounted;