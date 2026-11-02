import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingNav from './components/FloatingNav';
import PixelBackground from './components/PixelBackground';
import { SLIDES_LIST } from './data/slidesList';

// Slide Group 1: Pengantar, Event & ActionListener
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

// Slide Group 2: 4 Tahap Tindakan & Validasi Input
import {
  FourStagesPipelineSlide,
  ValidationFailureUxSlide,
  ValidationTypesMatrixSlide,
  ParsingAndBusinessRuleSlide,
  ErrorMessageBestPracticeSlide,
} from './slides/ValidationPipelineSlides';

// Slide Group 3: CardLayout & Contoh Lengkap DemoFormRingkasan
import {
  CardLayoutConceptSlide,
  CardLayoutInteractiveSimSlide,
  DemoCodeStructureSlide,
  DemoCodePanelsSlide,
  DemoCodeValidationSlide,
} from './slides/CardLayoutAndDemoSlides';

// Slide Group 4: EDT, SwingWorker & State Form
import {
  EdtConceptSlide,
  SwingWorkerTableSlide,
  SwingWorkerIntegrationSlide,
  FormStateConsistencySlide,
} from './slides/EdtAndSwingWorkerSlides';

// Slide Group 5: Langkah Eksperimen Praktikum
import {
  ExperimentSetupSlide,
} from './slides/HandsOnExperimentSlides';

// Slide Group 6: Sesi Mandiri, Rangkuman & Penutup
import {
  ChallengeModifikasiSlide,
  SummarySlide,
  ClosingSlide,
} from './slides/InteractiveAndClosingSlides';

const TOTAL_SLIDES = SLIDES_LIST.length;

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

const SLIDE_COMPONENTS = [
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
];

export default function App() {
  const [[currentSlide, direction], setSlideState] = useState([0, 0]);
  const [reviewStep, setReviewStep] = useState(0);
  const [borderStep, setBorderStep] = useState(0);
  const [errorStep, setErrorStep] = useState(0);

  const navigateTo = useCallback(
    (targetIndex) => {
      if (targetIndex < 0 || targetIndex >= TOTAL_SLIDES || targetIndex === currentSlide) {
        return;
      }
      const newDirection = targetIndex > currentSlide ? 1 : -1;
      setSlideState([targetIndex, newDirection]);
      setReviewStep(0);
      setBorderStep(0);
      setErrorStep(0);
    },
    [currentSlide]
  );

  const handleNext = useCallback(() => {
    // Slide 2 (index 1: ReviewLayoutManagerSlide) reveals answers one by one (step 1, 2, 3)
    if (currentSlide === 1 && reviewStep < 3) {
      setReviewStep((prev) => prev + 1);
      return;
    }

    // Slide 3 (index 2: ReviewBorderLayoutSlide) reveals answers one by one (step 1 to 5)
    if (currentSlide === 2 && borderStep < 5) {
      setBorderStep((prev) => prev + 1);
      return;
    }

    // Slide 16 (index 15: ErrorMessageBestPracticeSlide) has 6 interactive sub-steps (0 to 5)
    if (currentSlide === 15 && errorStep < 5) {
      setErrorStep((prev) => prev + 1);
      return;
    }

    if (currentSlide < TOTAL_SLIDES - 1) {
      setSlideState([currentSlide + 1, 1]);
      setReviewStep(0);
      setBorderStep(0);
      setErrorStep(0);
    }
  }, [currentSlide, reviewStep, borderStep, errorStep]);

  const handlePrev = useCallback(() => {
    // If on Slide 2 and answers are revealed, step backwards one by one
    if (currentSlide === 1 && reviewStep > 0) {
      setReviewStep((prev) => prev - 1);
      return;
    }

    // If on Slide 3 and answers are revealed, step backwards one by one
    if (currentSlide === 2 && borderStep > 0) {
      setBorderStep((prev) => prev - 1);
      return;
    }

    // If on Slide 16 and in sub-steps, step backwards within the slide
    if (currentSlide === 15 && errorStep > 0) {
      setErrorStep((prev) => prev - 1);
      return;
    }

    if (currentSlide > 0) {
      setSlideState([currentSlide - 1, -1]);
      if (currentSlide - 1 === 1) {
        setReviewStep(3);
      } else {
        setReviewStep(0);
      }
      if (currentSlide - 1 === 2) {
        setBorderStep(5);
      } else {
        setBorderStep(0);
      }
      if (currentSlide - 1 === 15) {
        setErrorStep(5);
      } else {
        setErrorStep(0);
      }
    }
  }, [currentSlide, reviewStep, borderStep, errorStep]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
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
  }, [handleNext, handlePrev]);

  const CurrentSlideComponent = SLIDE_COMPONENTS[currentSlide] || CoverSlide;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#FAFAFA] text-zinc-900 select-none">
      {/* Background Animation (Dipertahankan) */}
      <PixelBackground />

      {/* Main Slide Presentation Container (100vh Full Screen) */}
      <main className="relative z-10 w-full h-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full"
          >
            <CurrentSlideComponent
              step={
                currentSlide === 1
                  ? reviewStep
                  : currentSlide === 2
                  ? borderStep
                  : errorStep
              }
              setStep={
                currentSlide === 1
                  ? setReviewStep
                  : currentSlide === 2
                  ? setBorderStep
                  : setErrorStep
              }
              onNextStep={handleNext}
              onPrevStep={handlePrev}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Discreet PPT Navigation Controls (Bottom-Left Jump & Bottom-Right Prev/Next) */}
      <FloatingNav
        currentIndex={currentSlide}
        totalSlides={TOTAL_SLIDES}
        slidesList={SLIDES_LIST}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelectSlide={navigateTo}
      />
    </div>
  );
}
