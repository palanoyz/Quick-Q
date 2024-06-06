const RestaurantPage = () => {
    return (
        <>
            <div className="text-center mt-12 text-text">
                <h1 className="text-3xl md:text-5xl font-bold">Suki Teenoi</h1>
                <div className="mt-12 mb-16">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Q (Type: 2 seats)</h1>
                    <h1 className="text-6xl md:text-8xl text-primary font-bold mb-12">A90</h1>
                    <p className="text-xl md:text-2xl font-bold">Remaining: 5 Q</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 mb-12">
                    <div className="mt-12">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Type: 2 seats</h1>
                        <h1 className="text-6xl md:text-8xl text-primary font-bold mb-12">A80</h1>
                        <p className="text-xl md:text-2xl font-bold">Remaining: 20 Q</p>
                    </div>
                    <div className="mt-12">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Type: 4 seats</h1>
                        <h1 className="text-6xl md:text-8xl text-primary font-bold mb-12">B23</h1>
                        <p className="text-xl md:text-2xl font-bold">Remaining: 15 Q</p>
                    </div>
                    <div className="mt-12">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Type: 10 seats</h1>
                        <h1 className="text-6xl md:text-8xl text-primary font-bold mb-12">C12</h1>
                        <p className="text-xl md:text-2xl font-bold">Remaining: 8 Q</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RestaurantPage;
