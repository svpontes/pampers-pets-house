import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col justify-center">

      {/* --- 1. LAYER DO FUNDO (Limpo) --- */}
      <Image
        src="/zig_dog.png"
        alt="Background Clean"
        fill
        priority
        className="object-cover z-0 hidden lg:block"
        style={{ objectPosition: 'center' }}
      />

      {/* --- 2. LAYER DO ZIG DOG (Desktop - Lado Esquerdo) --- */}
      <div className="hidden lg:block absolute bottom-50 left-10 z-10 h-[85%] w-auto aspect-[4/5] max-w-[50%]">
        <Image
            src="/zigdogemcimabackground.png"
            alt="Zig Dog Hero"
            fill
            className="object-contain object-bottom"
            priority
        />
      </div>

      {/* --- 3. CONTAINER DE CONTEÚDO (Texto + Mobile) --- */}
      <div className="relative z-20 flex flex-col justify-center px-6 pb-8 lg:absolute lg:inset-0 lg:pb-0 lg:flex-row lg:items-center lg:justify-end lg:pr-20 xl:pr-40">
        
        {/* Wrapper do Texto - No Desktop ocupa a metade direita (w-1/2) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-10 lg:space-y-8 mb-4 lg:mb-0">
    
          {/* --- Imagem Mobile (Topo) --- */}
          <div className="lg:hidden relative mb-6 -mt-12 sm:-mt-20 md:-mt-32 w-40 h-40 sm:w-52 sm:h-52 md:w-80 md:h-80">
             <Image 
               src="/dogup.jpg"
               alt="Happy Dog"
               fill
               className="object-contain"
               priority
             />
          </div>

          {/* --- TEXTOS --- */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold text-gray-900 tracking-tight leading-tight drop-shadow-sm">
            Pamper´s Pets House
          </h1>

          <p className="text-base sm:text-xl md:text-3xl lg:text-2xl xl:text-3xl text-gray-800 font-medium drop-shadow-sm max-w-xs sm:max-w-md md:max-w-2xl mx-auto lg:mx-0">
            Caring for your Pets with Love and Dedication
          </p>

          {/* --- BOTÃO --- */}
          <button 
            className="mt-4 px-8 py-3 md:px-12 md:py-5 rounded-full text-white font-bold text-sm md:text-2xl shadow-xl transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: 'rgb(255, 102, 51)' }}
          >
            Learn More
          </button>

          {/* --- IMAGEM 3DOGS (Base) --- */}
          {/* ALTERAÇÕES FEITAS:
              1. Removi 'lg:hidden' (agora aparece sempre).
              2. Mantive 'w-full h-auto': A imagem vai esticar até o max-w-[500px], 
                 mas se a tela diminuir, ela encolhe junto proporcionalmente.
              3. Adicionei 'lg:px-0' para alinhar melhor com o texto no desktop.
          */}
          <div className="mt-8 w-full max-w-[500px] px-4 lg:px-0">
             <Image 
               src="/3dogs.png"
               alt="Three dogs illustration"
               width={500}
               height={200}
               className="w-full h-auto object-contain"
             />
          </div>
          
        </div>
      </div>

    </div>
  );
}