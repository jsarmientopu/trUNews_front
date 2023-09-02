'use client';

import { useState } from 'react';
import {Button} from '@nextui-org/button';

const LoadingButton = ({ children } : {
    children: React.ReactNode
}) => {
    const [ loading, setLoading ] = useState<boolean>(false)

    return (
        <Button variant='ghost' isLoading={loading} onClick={() => setLoading(!loading)}>{children}</Button>
    );
};

export default LoadingButton;