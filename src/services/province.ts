import axios from 'axios'
import { DistrictDetailProps, ProvinceDetailProps, ProvinceProps } from '~/types/province.type'
import { callAxios } from '~/utils/callAxios'

const province = axios.create({
  baseURL: 'https://provinces.open-api.vn'
})

export const listProvinceService = async () => {
  return callAxios<ProvinceProps[]>(province.get('/api/p'))
}

export const getDistrictService = async (provinceCode: number) => {
  return callAxios<ProvinceDetailProps>(province.get(`api/p/${provinceCode}?depth=2`))
}

export const getWardService = async (districtCode: number) => {
  return callAxios<DistrictDetailProps>(province.get(`api/d/${districtCode}?depth=2`))
}
