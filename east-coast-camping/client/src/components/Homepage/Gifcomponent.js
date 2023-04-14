import React from 'react';

const GifComponent = () => {
    return (
        <section style={{ position: 'relative', marginBottom: '50px' }}>
            <div style={{ position: 'relative', maxWidth: '100%', overflow: 'hidden', maxHeight: '500px' }}>
                <img src="https://user-images.githubusercontent.com/112873819/232036170-80118ef6-d52d-4eca-927b-03b46304e562.gif" alt="Animated GIF" style={{ width: '100%' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}>
                    <h2 style={{ margin: 0, color: 'white' }}>Take only memories, leave only footprints</h2>
                </div>
            </div>
        </section>
    );
};

export default GifComponent;