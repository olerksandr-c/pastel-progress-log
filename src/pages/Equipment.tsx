import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  HardDrive, 
  MapPin, 
  Calendar,
  Wrench,
  AlertCircle,
  CheckCircle,
  Settings
} from "lucide-react";

export default function Equipment() {
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
      ]
    }
  ];

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
          <TabsTrigger value="equipment">Обладнання</TabsTrigger>
        </TabsList>

        <TabsContent value="locations" className="space-y-6">
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
            </CardContent>
          </Card>

          {/* Locations List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <Card key={location.id} className="hover:shadow-lg transition-shadow cursor-pointer">
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
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          {/* Search and Filters */}
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
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-foreground">Компоненти</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}