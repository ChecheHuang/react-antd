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
        currentStep={currentStep}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onChange={onChange}
      >
        <StepContainer.Item title="test">
          <div>test</div>
        </StepContainer.Item>
        <StepContainer.Item title="test2">
          <div>test2</div>
        </StepContainer.Item>
        <StepContainer.Item title="test3">
          <div>test3</div>
        </StepContainer.Item>
      </StepContainer>
    </>
  )
}

export default Page
