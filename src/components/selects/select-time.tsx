import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
  
  type ChartSelectTimeProps = {
    currentTime: string
    times: {[key: string]: string}[]
    handleChange: (time: string) => void
    placeholder: string
  }
  const SelectTime = ({
    times,
    currentTime,
    handleChange,
    placeholder,
  }: ChartSelectTimeProps) => {
    const propTime = Object.keys(times[0])[0]
  
    return (
      <Select value={currentTime} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {times.map((time, idx) => (
              <SelectItem key={idx} value={time[propTime]}>
                {time[propTime]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }
  
  export default SelectTime
  