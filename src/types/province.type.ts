export interface ProvinceProps {
  name: string
  code: number
}

export interface ProvinceDetailProps {
  name: string
  code: number
  districts: ProvinceProps[]
}

export interface DistrictDetailProps {
  name: string
  code: number
  wards: ProvinceProps[]
}
