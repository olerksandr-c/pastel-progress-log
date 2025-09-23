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
      name: "ПС 'Киїнка'",
      address: "вул. Шевченка, 15, м. Київ",
      equipmentCount: 12,
      status: "active"
    },
    {
      id: 2,
      name: "РП 'Центральна'",
      address: "пр. Центральний, 45, м. Київ",
      equipmentCount: 8,
      status: "active"
    },
    {
      id: 3,
      name: "ТП-10",
      address: "вул. Промислова, 23, м. Київ",
      equipmentCount: 5,
      status: "maintenance"
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
          className={`flex items-center gap-2 py-2 px-3 hover:bg-muted/50 rounded cursor-pointer border border-border ${
            level === 0 ? 'border-2' : level === 1 ? 'ml-6' : level === 2 ? 'ml-12' : 'ml-18'
          } ${selectedId === node.name ? 'bg-primary/10 border-primary' : ''}`}
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
          <div className="ml-4">
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
          <TabsTrigger value="network">Мережа</TabsTrigger>
        </TabsList>

        <TabsContent value="network" className="space-y-6">
          {/* Search Equipment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Пошук обладнання</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Пошук за назвою..."
                    className="pl-10"
                  />
                </div>
                <Input placeholder="Інвентарний номер" />
                <Input placeholder="Код підприємства" />
              </div>
            </CardContent>
          </Card>

          {/* Network Hierarchy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Структура мережі</CardTitle>
              <CardDescription>
                Ієрархічне відображення організаційної структури
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {hierarchyData.map((node) => (
                  <TreeNode key={node.id} node={node} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Equipment List */}
          <div className="space-y-4">
            {equipment.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>Інв. №:</span>
                          <span className="font-medium">{item.inventoryNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Наступне ТО: {item.nextMaintenance}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Wrench className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left side - Equipment Schematic */}
                    <div>
                      <h4 className="text-sm font-medium mb-3 text-foreground">Шафа КП ТМ</h4>
                      <div className="border-2 border-border rounded-lg p-4 bg-muted/20 min-h-[200px] relative">
                        {/* Simplified cabinet representation */}
                        <div className="space-y-2">
                          <div className="border border-primary bg-primary/10 p-3 rounded text-xs text-center">
                            {item.components.find(c => c.type === "Процесор")?.model || "Процесор"}
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
                      </div>
                      
                      {/* Components List */}
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-3 text-foreground">Компоненти</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {item.components.map((component, index) => (
                            <div 
                              key={index}
                              className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm"
                            >
                              <div>
                                <span className="font-medium">{component.type}</span>
                                {component.model && (
                                  <div className="text-muted-foreground text-xs">
                                    {component.model}
                                  </div>
                                )}
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {component.quantity}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right side - Maintenance Schedule Table */}
                    <div>
                      <h4 className="text-sm font-medium mb-3 text-foreground">
                        Перелік обладнання з датою заміни наступним ТО
                      </h4>
                      <div className="border border-border rounded-lg">
                        <div className="bg-muted/50 px-4 py-3 border-b border-border">
                          <div className="grid grid-cols-2 gap-4 text-xs font-medium text-muted-foreground uppercase">
                            <div>Компонент</div>
                            <div>Дата ТО</div>
                          </div>
                        </div>
                        <div className="divide-y divide-border">
                          {item.maintenanceSchedule.map((maintenance, index) => (
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
                  </div>
                </CardContent>
              </Card>
            ))}
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
                    onClick={() => setShowObjectPassport(true)}
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Паспорт об'єкту</DialogTitle>
            <DialogDescription>
              Згодом тут буде паспорт об'єкту
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}