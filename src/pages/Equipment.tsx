import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Search, 
  Plus, 
  HardDrive, 
  MapPin, 
  Calendar,
  Wrench,
  AlertCircle,
  CheckCircle,
  Settings,
  ChevronRight,
  ChevronDown,
  Building2,
  Zap,
  Network
} from "lucide-react";

export default function Equipment() {
  const [selectedOrgUnit, setSelectedOrgUnit] = React.useState<string | null>(null);
  const [showObjectPassport, setShowObjectPassport] = React.useState(false);
  const [selectedObject, setSelectedObject] = React.useState<any>(null);
  const [showNetworkMessage, setShowNetworkMessage] = React.useState(false);
  
  const hierarchyData = [
    {
      id: "org1",
      name: "АТ ЧЕРНІГІВОБЛЕНЕРГО",
      type: "organization",
      children: [
        {
          id: "rem1", 
          name: "ВП Чернігівський РЕМ",
          type: "rem",
          children: [
            {
              id: "dep1",
              name: "Городнянська дільниця", 
              type: "department",
              children: [
                {
                  id: "sub1",
                  name: "ПС 110/35/10 Городня",
                  type: "substation"
                }
              ]
            },
            {
              id: "dep2",
              name: "Бахмацька дільниця",
              type: "department", 
              children: [
                {
                  id: "sub2",
                  name: "ПС 110/35/10 Бахмач-2",
                  type: "substation"
                },
                {
                  id: "sub3", 
                  name: "ПС 35/10 Батурин",
                  type: "substation"
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  const locations = [
    {
      id: 1,
      name: "ПС 110/35/10 'Городня'",
      address: "с. Городня, Чернігівський район",
      equipmentCount: 15,
      status: "active",
      type: "ПС",
      equipment: [
        {
          id: 1,
          name: "Комплекс ТМ на ПС 110/35/10 'Городня'",
          inventoryNumber: "INV-2024-001",
          enterpriseCode: "EC-GOR-001",
          installDate: "2023-03-15",
          status: "active",
          nextMaintenance: "2024-10-15",
          components: [
            { type: "Монтажна панель", model: "23TP22", quantity: 1, nextMaintenance: "2024-12-15" },
            { type: "Плата живлення", model: "560PSU01", quantity: 1, nextMaintenance: "2024-11-20" },
            { type: "Плата ТУ (Телеуправління)", model: "23ВА20", quantity: 3, nextMaintenance: "2025-01-10" },
            { type: "Плата ТС (Телесигналізації)", model: "23ВЕ21", quantity: 8, nextMaintenance: "2025-01-10" },
            { type: "Процесор", model: "560CMU05", quantity: 1, nextMaintenance: "2024-12-01" },
            { type: "Флеш-карта RTU", model: "version 10", quantity: 1, nextMaintenance: "2025-03-15" },
            { type: "Модем", model: "MikroTik RB260GS", quantity: 1, nextMaintenance: "2024-11-25" },
            { type: "Перетворювач RS-485", model: "-", quantity: 0, nextMaintenance: "-" },
            { type: "Автоматичний вимикач 10А", model: "10 А", quantity: 1, nextMaintenance: "2025-02-10" },
            { type: "Автоматичний вимикач 2А", model: "2 А", quantity: 1, nextMaintenance: "2025-02-10" },
            { type: "Розетка на DIN-рейці", model: "Розетка на DIN-рейці – 1 шт", quantity: 1, nextMaintenance: "2025-06-01" },
            { type: "Розеточна колодка", model: "Розеточна колодка – 2 шт", quantity: 1, nextMaintenance: "2025-06-01" },
            { type: "Блок живлення КП", model: "23VG23", quantity: 1, nextMaintenance: "2024-12-20" },
            { type: "Блок живлення розділовий", model: "SD-15B-24", quantity: 1, nextMaintenance: "2024-12-20" },
            { type: "Акумулятор", model: "Yuasa NP7-12", quantity: 2, nextMaintenance: "2024-11-05" },
            { type: "Обігрівач", model: "Pfannenberg FLH 150", quantity: 1, nextMaintenance: "2025-04-15" },
            { type: "Термостат", model: "Pfannenberg FLZ 520", quantity: 1, nextMaintenance: "2025-04-15" }
          ],
          configFiles: [
            { name: "Конфігураційний файл ПС", type: "Файл", date: "2024-03-15" },
            { name: "Проєкт модернізації", type: "Проєкт", date: "2024-01-20" }
          ],
          photos: [
            { name: "Фото КП ТМ", type: "Фото КП ТМ", date: "2024-02-10" },
            { name: "Фото обладнання ПС", type: "Фото обладнання ПС", date: "2024-02-10" }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "РП-22 м.Чернігів",
      address: "вул. Промислова, 22, м. Чернігів",
      equipmentCount: 8,
      status: "active",
      type: "РП",
      equipment: [
        {
          id: 2,
          name: "Комплекс ТМ РП-22",
          inventoryNumber: "INV-2024-002",
          enterpriseCode: "EC-CHE-002",
          installDate: "2023-01-20",
          status: "maintenance",
          nextMaintenance: "2024-09-20",
          components: [
            { type: "Шафа КП ТМ", model: "Стандартна шафа", quantity: 1, nextMaintenance: "2024-10-30" },
            { type: "Мікропроцесорні пристрої", model: "МП-570М1В", quantity: 2, nextMaintenance: "2024-12-10" },
            { type: "Лічильники", model: "Енергомера CE102M", quantity: 4, nextMaintenance: "2025-01-20" },
            { type: "Модем", model: "iRZ ATM21", quantity: 1, nextMaintenance: "2024-11-15" },
            { type: "Антена", model: "Направлена антена", quantity: 1, nextMaintenance: "2025-03-01" }
          ],
          configFiles: [
            { name: "Конфігураційний файл РП", type: "Файл", date: "2024-01-15" },
            { name: "Проєкт РП-22", type: "Проєкт", date: "2023-12-10" }
          ],
          photos: [
            { name: "Фото КП ТМ РП-22", type: "Фото КП ТМ", date: "2024-01-25" },
            { name: "Фото обладнання РП", type: "Фото обладнання ПС", date: "2024-01-25" }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "СП-115-11 'Березна-Локнисте'",
      address: "між с. Березна та с. Локнисте",
      equipmentCount: 5,
      status: "maintenance",
      type: "СП",
      equipment: [
        {
          id: 3,
          name: "Реклоузер СП-115-11",
          inventoryNumber: "INV-2024-003",
          enterpriseCode: "EC-BER-003",
          installDate: "2022-08-10",
          status: "active",
          nextMaintenance: "2024-12-15",
          components: [
            { type: "Назва реклоузера", model: "Cooper Power Systems Form 6", quantity: 1, nextMaintenance: "2024-12-15" },
            { type: "Модем", model: "Sierra Wireless AirLink", quantity: 1, nextMaintenance: "2024-11-30" },
            { type: "Антени", model: "Направлена антена 4G", quantity: 2, nextMaintenance: "2025-02-28" },
            { type: "Блок живлення", model: "24В/5А", quantity: 1, nextMaintenance: "2024-12-05" },
            { type: "Акумулятор", model: "AGM 12V/100Ah", quantity: 2, nextMaintenance: "2024-10-25" }
          ],
          photos: [
            { name: "Фото реклоузера", type: "Фото обладнання", date: "2024-01-10" },
            { name: "Фото встановлення", type: "Фото обладнання", date: "2022-08-15" }
          ]
        }
      ]
    }
  ];

  const equipment = [
    {
      id: 1,
      name: "Комплекс ТМ на ПС 'Киїнка'",
      inventoryNumber: "INV-2024-001",
      enterpriseCode: "EC-KYV-001",
      location: "ПС 'Киїнка'",
      installDate: "2023-03-15",
      status: "active",
      nextMaintenance: "2024-10-15",
      components: [
        { type: "Процесор", model: "Intel Atom D525", quantity: 1 },
        { type: "Модем", model: "iRZ ATM21", quantity: 1 },
        { type: "ББЖ", model: "APC Smart-UPS 1500VA", quantity: 1 },
        { type: "Плата ТУ", model: "", quantity: 4 },
        { type: "Плата ТС", model: "", quantity: 8 }
      ],
      maintenanceSchedule: [
        { component: "Процесор", nextMaintenance: "2024-12-15" },
        { component: "Модем", nextMaintenance: "2024-11-20" },
        { component: "ББЖ", nextMaintenance: "2024-10-30" },
        { component: "Плата ТУ", nextMaintenance: "2025-01-15" },
        { component: "Плата ТС", nextMaintenance: "2025-01-15" }
      ]
    },
    {
      id: 2,
      name: "ПС110-БС-Елань-А",
      inventoryNumber: "INV-2024-002",
      enterpriseCode: "EC-ELN-002",
      location: "РП 'Центральна'",
      installDate: "2023-01-20",
      status: "maintenance",
      nextMaintenance: "2024-09-20",
      components: [
        { type: "Перетворювач RS-485", model: "Moxa-N2", quantity: 1 },
        { type: "Контролер приєднань", model: "МР-570М1В", quantity: 2 },
        { type: "ББЖ", model: "APC UPS 500", quantity: 1 },
        { type: "Обігрівач", model: "Planshery-215 150v", quantity: 1 }
      ],
      maintenanceSchedule: [
        { component: "Перетворювач RS-485", nextMaintenance: "2024-11-15" },
        { component: "Контролер приєднань", nextMaintenance: "2024-12-01" },
        { component: "ББЖ", nextMaintenance: "2024-10-25" },
        { component: "Обігрівач", nextMaintenance: "2024-11-30" }
      ]
    }
  ];

  // Tree component for hierarchical view
  const TreeNode = ({ node, level = 0, onSelect, selectedId }: { node: any; level?: number; onSelect?: (nodeId: string) => void; selectedId?: string | null }) => {
    const [isExpanded, setIsExpanded] = React.useState(true);
    
    const getIcon = (type: string) => {
      switch (type) {
        case 'organization': return <Building2 className="h-4 w-4" />;
        case 'rem': return <Network className="h-4 w-4" />;
        case 'department': return <HardDrive className="h-4 w-4" />;
        case 'substation': return <Zap className="h-4 w-4" />;
        default: return <div className="w-4 h-4" />;
      }
    };

    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <div className="select-none">
        <div
          className={`flex items-center gap-2 py-2 px-3 hover:bg-muted/50 rounded cursor-pointer ${
            level === 0 ? '' : level === 1 ? 'ml-3' : level === 2 ? 'ml-6' : 'ml-9'
          } ${selectedId === node.name ? 'bg-primary/10' : ''}`}
          onClick={() => {
            if (hasChildren) {
              setIsExpanded(!isExpanded);
            }
            onSelect && onSelect(node.name);
          }}
        >
          {hasChildren && (
            <button className="p-0.5">
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-4" />}
          {getIcon(node.type)}
          <span className="font-medium text-sm">{node.name}</span>
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {node.children.map((child: any) => (
              <TreeNode
                key={child.id}
                node={child}
                level={level + 1}
                onSelect={onSelect}
                selectedId={selectedId}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Об'єкти та обладнання</h1>
          <p className="text-muted-foreground mt-2">
            Управління обладнанням та контроль його стану
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Додати об'єкт
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Додати обладнання
          </Button>
        </div>
      </div>

      <Tabs defaultValue="locations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="locations">Об'єкти</TabsTrigger>
          <TabsTrigger value="network" onClick={() => setShowNetworkMessage(true)}>Мережа</TabsTrigger>
        </TabsList>

        <TabsContent value="network" className="space-y-6">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center text-muted-foreground">
              <p className="text-lg">Виберіть вкладку "Об'єкти" для перегляду об'єктів</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left side - Organizational Structure */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Структура організації</CardTitle>
                  <CardDescription>
                    Ієрархічне відображення організаційної структури
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {hierarchyData.map((node) => (
                      <div key={node.id}>
                        <TreeNode 
                          node={node} 
                          onSelect={(nodeId) => setSelectedOrgUnit(nodeId)}
                          selectedId={selectedOrgUnit}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side - Objects filtered by selected org unit */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Пошук об'єктів</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Пошук за назвою або адресою..."
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Button variant="outline">
                      Фільтри
                    </Button>
                  </div>
                  {selectedOrgUnit && (
                    <div className="mt-3 text-sm text-muted-foreground">
                      Фільтр за: <span className="font-medium">{selectedOrgUnit}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Locations List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {locations
                  .filter(location => {
                    if (!selectedOrgUnit) return true; // No selection - show all
                    if (selectedOrgUnit === "АТ ЧЕРНІГІВОБЛЕНЕРГО") return true; // Top level - show all
                    return location.name.includes(selectedOrgUnit.split(' ').pop() || ''); // Filter by selected unit
                  })
                  .map((location) => (
                  <Card 
                    key={location.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedObject(location);
                      setShowObjectPassport(true);
                    }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{location.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {location.address}
                          </CardDescription>
                        </div>
                        <Badge 
                          variant={location.status === 'active' ? 'success' : 'warning'}
                          className="text-xs"
                        >
                          {location.status === 'active' ? 'Активний' : 'ТО'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <HardDrive className="h-4 w-4" />
                          <span>{location.equipmentCount} одиниць обладнання</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

      </Tabs>

      {/* Object Passport Dialog */}
      <Dialog open={showObjectPassport} onOpenChange={setShowObjectPassport}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Паспорт {selectedObject?.name}
            </DialogTitle>
            <DialogDescription>
              Детальна інформація про обладнання об'єкту
            </DialogDescription>
          </DialogHeader>
          
          {selectedObject && selectedObject.equipment && (
            <div className="space-y-6">
              {selectedObject.equipment.map((item: any) => (
                <div key={item.id} className="space-y-4">
                  {/* Equipment Header */}
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Інв. №: {item.inventoryNumber}</span>
                        <span>Код: {item.enterpriseCode}</span>
                        <span>Встановлено: {item.installDate}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={item.status === 'active' ? 'success' : 'warning'}
                      className="text-xs"
                    >
                      {item.status === 'active' ? (
                        <>
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Активне
                        </>
                      ) : (
                        <>
                          <AlertCircle className="mr-1 h-3 w-3" />
                          ТО
                        </>
                      )}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left side - Equipment Schematic */}
                    <div>
                      <h4 className="text-sm font-medium mb-3 text-foreground">
                        {selectedObject.type === 'СП' ? 'Схема СП' : 'Шафа КП ТМ'}
                      </h4>
                      <div className="border-2 border-border rounded-lg p-4 bg-muted/20 min-h-[200px] relative">
                        {/* Simplified cabinet/equipment representation */}
                        <div className="space-y-2">
                          {selectedObject.type === 'СП' ? (
                            // SP (Sectioning Point) layout
                            <div className="space-y-3">
                              <div className="border border-primary bg-primary/10 p-3 rounded text-xs text-center">
                                Реклоузер
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="border border-secondary bg-secondary/10 p-2 rounded text-xs text-center">
                                  Модем
                                </div>
                                <div className="border border-secondary bg-secondary/10 p-2 rounded text-xs text-center">
                                  Антени
                                </div>
                              </div>
                              <div className="border border-muted-foreground/30 bg-muted p-2 rounded text-xs text-center">
                                Блок живлення
                              </div>
                            </div>
                          ) : (
                            // PS/RP/TP layout
                            <div className="space-y-2">
                              <div className="border border-primary bg-primary/10 p-3 rounded text-xs text-center">
                                {item.components.find((c: any) => c.type.includes("Процесор"))?.model || "Процесор"}
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="border border-secondary bg-secondary/10 p-2 rounded text-xs text-center">
                                  Модем
                                </div>
                                <div className="border border-secondary bg-secondary/10 p-2 rounded text-xs text-center">
                                  ББЖ
                                </div>
                              </div>
                              <div className="grid grid-cols-4 gap-1">
                                <div className="border border-muted-foreground/30 bg-muted p-1 rounded text-xs text-center">ТУ</div>
                                <div className="border border-muted-foreground/30 bg-muted p-1 rounded text-xs text-center">ТУ</div>
                                <div className="border border-muted-foreground/30 bg-muted p-1 rounded text-xs text-center">ТС</div>
                                <div className="border border-muted-foreground/30 bg-muted p-1 rounded text-xs text-center">ТС</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Components List */}
                      <div className="mt-6">
                        <h4 className="text-sm font-medium mb-4 text-foreground">Компоненти</h4>
                        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                          {item.components.map((component: any, index: number) => (
                            <div 
                              key={index}
                              className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:bg-muted/30 transition-colors"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-foreground">{component.type}</div>
                                {component.model && component.model !== "-" && (
                                  <div className="text-muted-foreground text-xs mt-1">
                                    {component.model}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-3 ml-4">
                                <div className="text-right">
                                  <Badge variant="secondary" className="text-xs mb-1">
                                    {component.quantity}
                                  </Badge>
                                  {component.nextMaintenance && component.nextMaintenance !== "-" && (
                                    <div className="text-xs text-muted-foreground">
                                      ТО: {component.nextMaintenance}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right side - Additional Information */}
                    <div className="space-y-4">
                      {/* Configuration Files - only for PS/RP/TP */}
                      {selectedObject.type !== 'СП' && item.configFiles && (
                        <div>
                          <h4 className="text-sm font-medium mb-3 text-foreground">
                            Конфігураційні файли
                          </h4>
                          <div className="space-y-2">
                            {item.configFiles.map((file: any, index: number) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                                <div>
                                  <span className="font-medium">{file.name}</span>
                                  <div className="text-muted-foreground text-xs">
                                    {file.type} • {file.date}
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <HardDrive className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Photos */}
                      {item.photos && (
                        <div>
                          <h4 className="text-sm font-medium mb-3 text-foreground">
                            Фотографії
                          </h4>
                          <div className="space-y-2">
                            {item.photos.map((photo: any, index: number) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                                <div>
                                  <span className="font-medium">{photo.name}</span>
                                  <div className="text-muted-foreground text-xs">
                                    {photo.type} • {photo.date}
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                    📷
                                  </div>
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Maintenance Schedule - only if exists */}
                      {item.maintenanceSchedule && (
                        <div>
                          <h4 className="text-sm font-medium mb-3 text-foreground">
                            Графік технічного обслуговування
                          </h4>
                          <div className="border border-border rounded-lg">
                            <div className="bg-muted/50 px-4 py-3 border-b border-border">
                              <div className="grid grid-cols-2 gap-4 text-xs font-medium text-muted-foreground uppercase">
                                <div>Компонент</div>
                                <div>Дата ТО</div>
                              </div>
                            </div>
                            <div className="divide-y divide-border max-h-40 overflow-y-auto">
                              {item.maintenanceSchedule.map((maintenance: any, index: number) => (
                                <div key={index} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm hover:bg-muted/30">
                                  <div className="font-medium">{maintenance.component}</div>
                                  <div className="text-muted-foreground">
                                    {maintenance.nextMaintenance}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Network Message Dialog */}
      <Dialog open={showNetworkMessage} onOpenChange={setShowNetworkMessage}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Мережа</DialogTitle>
            <DialogDescription>
              Мережа буде реалізовано в наступних версіях
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}