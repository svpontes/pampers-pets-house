import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen md:h-screen bg-white overflow-hidden">

      {/* --- BANNER DESKTOP --- */}
      <Image
        src="/banner.jpg"
        alt="Banner Desktop"
        fill
        priority
        className="object-cover z-0 hidden md:block"
        style={{ objectPosition: 'center' }}
      />

      {/* --- CONTEÚDO --- */}
      {/* ALTERAÇÕES AQUI:
         1. Removi 'justify-end' (que empurrava para baixo no mobile).
         2. Adicionei 'justify-center' (para centralizar verticalmente no mobile).
         3. Removi 'pt-10' (padding top que sobrava).
      */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center pb-8 px-6 md:pb-0 md:flex-row md:items-center md:justify-end md:pr-90 md:pt-0">
        
        <div className="w-full max-w-lg flex flex-col items-center md:items-start text-center md:text-left space-y-3 md:space-y-8 mb-4 md:mb-32">
          
          {/* --- 1. IMAGEM DOGUP (Topo) --- */}
          <div className="md:hidden mb-4 relative w-40 h-40 sm:w-52 sm:h-52">
             <Image 
               src="/dogup.jpg"
               alt="dog destak"
               fill
               className="object-contain"
             />
          </div>

          {/* Título */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight drop-shadow-sm">
            Pamper´s Pets House
          </h1>

          {/* Subtítulo */}
          <p className="text-base sm:text-xl md:text-3xl text-gray-800 font-medium drop-shadow-sm max-w-xs md:max-w-full mx-auto md:mx-0">
            Caring for your Pets with Love and Dedication
          </p>

          {/* Botão */}
          <button 
            className="mt-2 px-6 py-2 md:px-10 md:py-4 rounded-full text-white font-bold text-sm md:text-xl shadow-xl transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: 'rgb(255, 102, 51)' }}
          >
            Learn More
          </button>

          {/* --- 2. IMAGEM 3DOGS (Fundo) --- */}
          <div className="md:hidden mt-6 relative w-60 h-24">
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