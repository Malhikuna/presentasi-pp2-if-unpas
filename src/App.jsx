import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingNav from './components/FloatingNav';
import PixelBackground from './components/PixelBackground';
import ModuleSelector from './components/ModuleSelector';
import { MODULES_CONFIG } from './data/modulesConfig';

// ================= MODUL 09 (PERTEMUAN 2) =================
import {
  CoverSlide,
  ReviewLayoutManagerSlide,
  ReviewBorderLayoutSlide,
  ObjectivesSlide,
  FormVisualSimulationSlide,
  EventIntroSlide,
  ListenerIntroSlide,
  GuiEventConceptSlide,
  EventDeepDiveSlide,
  ActionListenerLambdaSlide,
  ListenerArchitectureSlide,
} from './slides/IntroAndEventSlides';
import {
  FourStagesPipelineSlide,
  ValidationFailureUxSlide,
  ValidationTypesMatrixSlide,
  ParsingAndBusinessRuleSlide,
  ErrorMessageBestPracticeSlide,
} from './slides/ValidationPipelineSlides';
import {
  CardLayoutConceptSlide,
  CardLayoutInteractiveSimSlide,
  DemoCodeStructureSlide,
  DemoCodePanelsSlide,
  DemoCodeValidationSlide,
} from './slides/CardLayoutAndDemoSlides';
import {
  EdtConceptSlide,
  SwingWorkerTableSlide,
  SwingWorkerIntegrationSlide,
  FormStateConsistencySlide,
} from './slides/EdtAndSwingWorkerSlides';
import { ExperimentSetupSlide } from './slides/HandsOnExperimentSlides';
import {
  ChallengeModifikasiSlide,
  SummarySlide,
  ClosingSlide,
} from './slides/InteractiveAndClosingSlides';

// ================= MODUL 10 (PERTEMUAN 3) =================
import {
  Mod10CoverSlide,
  Mod10ReviewStagesSlide,
  Mod10ObjectivesSlide,
  Mod10TableModelConceptSlide,
  Mod10IdentityVsIndexSlide,
  Mod10CoreCodeSlide,
} from './slides/mod10/Mod10IntroAndConceptSlides';
import {
  Mod10JTableScrollSimSlide,
  Mod10SortingTypeSimSlide,
  Mod10ViewVsModelSimSlide,
  Mod10MemoryVsDbSimSlide,
  Mod10LayeredArchSimSlide,
} from './slides/mod10/Mod10SimulationSlides';
import {
  Mod10TaskMusicSlide,
  Mod10SummarySlide,
  Mod10ClosingSlide,
} from './slides/mod10/Mod10ExperimentAndClosingSlides';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 34 },
      opacity: { duration: 0.18 },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 34 },
      opacity: { duration: 0.15 },
    },
  }),
};

const MODULE_SLIDE_COMPONENTS = {
  'modul-09': [
    CoverSlide,
    ReviewLayoutManagerSlide,
    ReviewBorderLayoutSlide,
    ObjectivesSlide,
    FormVisualSimulationSlide,
    EventIntroSlide,
    ListenerIntroSlide,
    EventDeepDiveSlide,
    ListenerArchitectureSlide,
    ActionListenerLambdaSlide,
    GuiEventConceptSlide,
    FourStagesPipelineSlide,
    ValidationFailureUxSlide,
    ValidationTypesMatrixSlide,
    ParsingAndBusinessRuleSlide,
    ErrorMessageBestPracticeSlide,
    CardLayoutConceptSlide,
    CardLayoutInteractiveSimSlide,
    DemoCodeStructureSlide,
    DemoCodePanelsSlide,
    DemoCodeValidationSlide,
    EdtConceptSlide,
    SwingWorkerTableSlide,
    SwingWorkerIntegrationSlide,
    FormStateConsistencySlide,
    ExperimentSetupSlide,
    ChallengeModifikasiSlide,
    SummarySlide,
    ClosingSlide,
  ],
  'modul-10': [
    Mod10CoverSlide,
    Mod10ReviewStagesSlide,
    Mod10ObjectivesSlide,
    Mod10JTableScrollSimSlide,
    Mod10TableModelConceptSlide,
    Mod10SortingTypeSimSlide,
    Mod10ViewVsModelSimSlide,
    Mod10IdentityVsIndexSlide,
    Mod10CoreCodeSlide,
    Mod10MemoryVsDbSimSlide,
    Mod10LayeredArchSimSlide,
    Mod10TaskMusicSlide,
    Mod10SummarySlide,
    Mod10ClosingSlide,
  ],
};

const STAGE_WIDTH = 1280;
const STAGE_HEIGHT = 760;

function useViewportScale() {
  const [layout, setLayout] = useState(() => {
    if (typeof window === 'undefined') return { scale: 1, isMobile: false };
    const w = window.innerWidth;
    const h = window.innerHeight;
    return {
      isMobile: w < 768,
      scale: Math.min(w / STAGE_WIDTH, h / STAGE_HEIGHT),
    };
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setLayout({
        isMobile: w < 768,
        scale: Math.min(w / STAGE_WIDTH, h / STAGE_HEIGHT),
      });
    };
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return layout;
}

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [[currentSlide, direction], setSlideState] = useState([0, 0]);
  const [subStep, setSubStep] = useState(0);
  const { scale, isMobile } = useViewportScale();

  const activeModule = MODULES_CONFIG.find((m) => m.id === activeModuleId) || null;
  const slideComponents = activeModuleId ? MODULE_SLIDE_COMPONENTS[activeModuleId] || [] : [];
  const totalSlides = slideComponents.length;

  useEffect(() => {
    if (!activeModule) {
      document.title = 'Presentasi Praktikum Pemrograman II — IF21W0508';
    } else {
      document.title = `${activeModule.code}: ${activeModule.title} — Praktikum Pemrograman II`;
    }
  }, [activeModule]);

  const handleSelectModule = useCallback((moduleId) => {
    setActiveModuleId(moduleId);
    setSlideState([0, 0]);
    setSubStep(0);
  }, []);

  const handleGoHome = useCallback(() => {
    setActiveModuleId(null);
    setSlideState([0, 0]);
    setSubStep(0);
  }, []);

  const navigateTo = useCallback(
    (targetIndex) => {
      if (targetIndex < 0 || targetIndex >= totalSlides || targetIndex === currentSlide) {
        return;
      }
      const newDirection = targetIndex > currentSlide ? 1 : -1;
      setSlideState([targetIndex, newDirection]);
      setSubStep(0);
    },
    [currentSlide, totalSlides]
  );

  const handleNext = useCallback(() => {
    if (!activeModule) return;

    const maxStepForCurrent = activeModule.subSteps?.[currentSlide] ?? 0;
    if (maxStepForCurrent > 0 && subStep < maxStepForCurrent) {
      setSubStep((prev) => prev + 1);
      return;
    }

    if (currentSlide < totalSlides - 1) {
      setSlideState([currentSlide + 1, 1]);
      setSubStep(0);
    }
  }, [activeModule, currentSlide, subStep, totalSlides]);

  const handlePrev = useCallback(() => {
    if (!activeModule) return;

    const maxStepForCurrent = activeModule.subSteps?.[currentSlide] ?? 0;
    if (maxStepForCurrent > 0 && subStep > 0) {
      setSubStep((prev) => prev - 1);
      return;
    }

    if (currentSlide > 0) {
      const prevSlide = currentSlide - 1;
      setSlideState([prevSlide, -1]);
      const prevMaxStep = activeModule.subSteps?.[prevSlide] ?? 0;
      setSubStep(prevMaxStep);
    }
  }, [activeModule, currentSlide, subStep]);

  useEffect(() => {
    if (!activeModuleId) return;

    const handleKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName;
      if (['INPUT', 'TEXTAREA'].includes(activeTag)) {
        return;
      }
      if (e.key === ' ' && activeTag === 'BUTTON') {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModuleId, handleNext, handlePrev]);

  const CurrentSlideComponent = slideComponents[currentSlide] || null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#FAFAFA] text-zinc-900 select-none">
      {/* Background Animation (Dipertahankan) */}
      <PixelBackground />

      {/* Main Container (Proportional Presentation Stage on Desktop/Laptop) */}
      <main className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
        <div
          style={
            isMobile
              ? undefined
              : {
                  width: `${STAGE_WIDTH}px`,
                  height: `${STAGE_HEIGHT}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'center center',
                }
          }
          className={isMobile ? 'w-full h-full overflow-y-auto' : 'shrink-0 relative'}
        >
          {!activeModule ? (
            <ModuleSelector modules={MODULES_CONFIG} onSelectModule={handleSelectModule} />
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${activeModuleId}-${currentSlide}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full"
              >
                {CurrentSlideComponent && (
                  <CurrentSlideComponent
                    step={subStep}
                    setStep={setSubStep}
                    onNextStep={handleNext}
                    onPrevStep={handlePrev}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>

      {/* Discreet PPT Navigation Controls */}
      {activeModule && (
        <FloatingNav
          currentIndex={currentSlide}
          totalSlides={totalSlides}
          slidesList={activeModule.slidesList}
          modules={MODULES_CONFIG}
          activeModuleId={activeModuleId}
          onSelectModule={handleSelectModule}
          onGoHome={handleGoHome}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectSlide={navigateTo}
        />
      )}
    </div>
  );
}
