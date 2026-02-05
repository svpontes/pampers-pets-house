import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col justify-center">

      {/* --- BANNER DESKTOP --- */}
      <Image
        src="/banner.jpg"
        alt="Banner Desktop"
        fill
        priority
        className="object-cover z-0 hidden xl:block" 
        style={{ objectPosition: 'center' }}
      />

       {/* Container Principal */}
       <div className="relative z-10 flex flex-col justify-center px-6 pb-8 xl:absolute xl:inset-0 xl:pb-0 xl:flex-row xl:items-center xl:justify-end xl:pr-40 xl:pt-0">
        
        <div className="w-full xl:max-w-lg flex flex-col items-center xl:items-start text-center xl:text-left space-y-6 md:space-y-10 xl:space-y-8 mb-4 xl:mb-32">
          
          {/* --- 1. IMAGEM DOGUP (Topo) --- */}
          {/* ALTERAÇÕES AQUI:
              1. Adicionei '-mt-12' (celular) e '-mt-32' (tablet/md) para puxar a imagem para o topo.
              2. Adicionei 'mb-6' para empurrar o texto de baixo um pouco, para não colar na imagem.
          */}
          <div className="xl:hidden relative mb-6 -mt-12 sm:-mt-20 md:-mt-32 w-40 h-40 sm:w-52 sm:h-52 md:w-80 md:h-80 lg:w-96 lg:h-96">
             <Image 
               src="/dogup.jpg"
               alt="dog destak"
               fill
               className="object-contain"
               priority
             />
          </div>

          {/* Título */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight drop-shadow-sm">
            Pamper´s Pets House
          </h1>

          {/* Subtítulo */}
          <p className="text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-3xl text-gray-800 font-medium drop-shadow-sm max-w-xs sm:max-w-md md:max-w-2xl mx-auto xl:mx-0">
            Caring for your Pets with Love and Dedication
          </p>

          {/* Botão */}
          <button 
            className="mt-4 px-8 py-3 md:px-12 md:py-5 rounded-full text-white font-bold text-sm md:text-2xl shadow-xl transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: 'rgb(255, 102, 51)' }}
          >
            Learn More
          </button>

          {/* --- 2. IMAGEM 3DOGS (Fundo) --- */}
          <div className="xl:hidden mt-8 relative w-60 h-24 sm:w-80 sm:h-32 md:w-[500px] md:h-[200px]">
             <Image 
               src="/3dogs.png"
               alt="Three dogs"
               fill
               className="object-contain"
             />
          </div>
          
        </div>
      </div>

    </div>
  );
}