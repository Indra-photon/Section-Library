
import Prism from './Prism';

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Grid Background */}
      <div style={{ width: '100%', height: '700px', position: 'relative' }}>
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
        />
      </div>
    </div>
  );
}
