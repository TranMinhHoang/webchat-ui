import { forwardRef, useState } from 'react';
import images from '~/assets/images';

const Image = forwardRef(({ src = '', alt, className, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(images.user);
    };

    return <img ref={ref} className={className} src={fallback || src} alt={alt} {...props} onError={handleError} />;
});

export default Image;
