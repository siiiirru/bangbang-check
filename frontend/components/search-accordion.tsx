'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function SearchAccordion() {
  return (
    <div className="space-y-4 mt-6">
      <Accordion type="single" collapsible className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="py-2 font-medium text-teal-700 hover:no-underline">1. 비용계획</AccordionTrigger>
          <AccordionContent>
            <div className="py-2 text-gray-700">
              <p>
              <strong>1) 계약 관련 초기 비용</strong> <br />
              - 보증금: 계약 시 한 번에 납부하는 금액으로, 계약 종료 시 돌려받을 수 있습니다. 보증금이 높을수록 월세는 낮아질 수 있습니다. <br />
              - 월세: 매달 납부해야 하는 금액이며, 지역·건물 상태·보증금에 따라 달라집니다. <br />
              - 중개수수료(부동산 수수료): 보증금 및 월세 금액에 따라 정해지는 수수료로, 계약 시 부동산에 지급합니다. <br />
              <br />
              <strong>2) 고정 지출 비용 </strong> <br />
              - 관리비: 월세 외에 매달 납부하는 비용입니다. 청소, 인터넷, TV, 수도, 전기 등 항목이 포함되어 있는지 꼭 확인하세요. <br />
              - 공과금: 전기요금, 수도요금, 가스요금. 개별난방인지 중앙난방인지 확인이 필요합니다. <br />
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="bg-white p-4 rounded-lg shadow-sm border border-fuchsia-100">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="py-2 font-medium text-fuchsia-700 hover:no-underline">
            2. 거주할 지역 정하기
          </AccordionTrigger>
          <AccordionContent>
            <div className="py-2 text-gray-700">
              <p>
              <strong>6가지를 확인해 나에게 잘 맞는 지역을 선택해보세요 </strong><br /><br />
              - 거리 : 학교나 직장까지 가까운가? (통학·출근 시간) <br />
              - 교통 : 지하철/버스 등 대중교통이 편리한가? <br />
              - 편의시설 : 마트, 병원, 편의점 등 생활시설이 근처에 있나? <br />
              - 치안 : 밤에 혼자 다녀도 안전한 동네인가? <br />
              - 주변 환경 : 조용하고 깨끗한 분위기인가?
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="bg-white p-4 rounded-lg shadow-sm border border-fuchsia-100">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="py-2 font-medium text-teal-700 hover:no-underline">
            3. 정보 수집 및 부동산 중개업자 방문
          </AccordionTrigger>
          <AccordionContent>
            <div className="py-2 text-gray-700">
              <p>
              - 예산과 조건 명확히 전달하기 (월세/전세, 구조, 위치 등)<br />
              - 관리비 포함 내역 확인하기 (인터넷, 수도 등 포함 여부)<br />
              - 전체 예상 월 지출 확인하기 (관리비 + 월세 합산)<br />
              - 계약 형태 확인 (전대차, 확정일자 가능 여부 등)<br />
              - 방 보러 갈 리스트 미리 받기 (위치·수량 파악)<br />
              - 계약 시 필요한 서류 확인 (신분증, 보증금 이체 준비)<br />
              - 중개보수료 기준 미리 확인하기
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="bg-white p-4 rounded-lg shadow-sm border border-fuchsia-100">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="py-2 font-medium text-fuchsia-700 hover:no-underline">
            4. 방 보러 가기
          </AccordionTrigger>
          <AccordionContent>
            <div className="py-2 text-gray-700">
              <p>
              방방체크와 함께 방을 보러 갈 때 확인해야 할 사항들을 체크하고, 기록하며, 공유해보세요.<br />
              각각의 체크리스트를 꼼꼼히 작성하고, 방을 찾는 과정에서 본인에게 가장 적합한 조건을 찾을 수 있도록 돕습니다. <br />
              기록한 내용을 친구나 가족과 공유하여, 함께 더 나은 결정을 내릴 수 있습니다.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="bg-white p-4 rounded-lg shadow-sm border border-fuchsia-100">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="py-2 font-medium text-teal-700 hover:no-underline">
            5. 계약하기
          </AccordionTrigger>
          <AccordionContent>
            <div className="py-2 text-gray-700">
              <p>
              - <strong>등기사항전부증명서 확인</strong>: 빚이 얼마나 있는지, 계약할 집과 내용이 일치하는지 확인하세요. 등기부상의 ‘을구’에는 내용이 없을수록 좋습니다. <br />
              - <strong>보증금 및 월세</strong>: 보증금과 월세, 관리비 등의 정확한 금액과 납부 일정을 확인하세요.<br />
              - <strong>계약일, 잔금일 협의</strong>: 보통의 월세 계약은 전체 거래 금액이 크지 않아 계약금/잔금으로 2번에 나눠 지급합니다. <br />
              - <strong>시설 점검</strong>: 전기, 수도, 가스 등 시설 상태를 체크하고 문제 있는 부분은 수정 요구하세요.<br />
              - <strong>입주 날짜</strong>: 실제 입주 날짜와 계약서 상의 입주 가능 날짜가 일치하는지 확인하세요.<br />
              - <strong>계약 해지 조건</strong>: 계약 해지 시의 조건과 위약금 등을 미리 알아두어 예상치 못한 비용을 피하세요.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="bg-white p-4 rounded-lg shadow-sm border border-fuchsia-100">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="py-2 font-medium text-fuchsia-700 hover:no-underline">
            6. 후속 작업
          </AccordionTrigger>
          <AccordionContent>
            <div className="py-2 text-gray-700">
              <p>
              <strong>1) 이사 방법 정하기 (포장이사, 일반이사):</strong><br />
              - 포장이사: 전문 업체에서 모든 물품을 포장하고 운반해 주므로 시간 절약과 물품의 안전한 이사가 가능합니다.<br />
              - 일반이사: 직접 물품을 포장하고 이사하는 방법으로, 비용은 절감되지만 시간이 더 걸릴 수 있습니다.<br />
              <br />
              <strong>2) 중요 물품 따로 챙기기:</strong><br />
              중요한 서류나 귀중품은 이사 당일에 따로 챙겨서 운반해야 합니다. 이를 별도로 관리하여 분실을 방지할 수 있습니다.<br />
              <br />
              <strong>3) 잔금 및 부동산 중개보수 지급:</strong><br />
              잔금은 계약서에 명시된 날짜에 정확히 지급해야 하며, 중개수수료는 계약 후 일정 금액을 부동산에 지급합니다.<br />
              <br />
              <strong>4) 전입신고 및 확정일자 받기:</strong><br />
              이사 후 14일 이내에 전입신고를 해야 하며, 확정일자를 받아야 법적 보호를 받을 수 있습니다.<br />
              <br />
              <strong>5) 우편물 주소 변경:</strong><br />
              우체국에 주소 변경 신청을 하여 기존 주소로 온 우편물이 새 주소로 전달되도록 설정해야 합니다.<br />
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

