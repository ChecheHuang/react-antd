import StepContainer from '@/components/container/StepContainer/StepContainer'
import { useState } from 'react'

const Page: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1)

  const handlePrevious = (prevStep: number) => {
    setCurrentStep(prevStep)
  }

  const handleNext = (nextStep: number) => {
    setCurrentStep(nextStep)
  }
  const onChange = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <>
      <StepContainer
        // isFixButton
        // isFixButtonAlwaysShow
        currentStep={currentStep}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onChange={onChange}
      >
        <StepContainer.Item title="step1">
          <div>step1</div>
        </StepContainer.Item>
        <StepContainer.Item title="step2">
          <div>step2</div>
        </StepContainer.Item>
        <StepContainer.Item title="step3">
          <div>step3</div>
        </StepContainer.Item>
      </StepContainer>
    </>
  )
}

export default Page
