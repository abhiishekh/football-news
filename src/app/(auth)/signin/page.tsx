import img from '@/app/assets/images/image.png';

export default function Signin() {
    return (
        <div>
            hello this is signin
            {/* Access img.src for the URL */}
            <div className='w-64 h-full bg-white rounded-lg m-auto'>

            <img src={img.src} alt="Signin Image" />
            </div>
        </div>
    );
}
