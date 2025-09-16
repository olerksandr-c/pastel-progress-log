import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin, 
  Navigation, 
  Layers,
  Filter,
  HardDrive,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export default function ObjectsMap() {
  const mapObjects = [
    {
      id: 1,
      name: "ПС 'Киїнка'",
      address: "вул. Шевченка, 15, м. Київ",
      coordinates: "50.4501, 30.5234",
      status: "active",
      equipmentCount: 12,
      activeIssues: 0,
      lastMaintenance: "2024-08-15"
    },
    {
      id: 2,
      name: "РП 'Центральна'",
      address: "пр. Центральний, 45, м. Київ",
      coordinates: "50.4547, 30.5238",
      status: "maintenance",
      equipmentCount: 8,
      activeIssues: 1,
      lastMaintenance: "2024-09-10"
    },
    {
      id: 3,
      name: "ТП-10",
      address: "вул. Промислова, 23, м. Київ",
      coordinates: "50.4429, 30.5186",
      status: "active",
      equipmentCount: 5,
      activeIssues: 0,
      lastMaintenance: "2024-09-01"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Карта об'єктів</h1>
          <p className="text-muted-foreground mt-2">
            Інтерактивна карта розташування об'єктів та їх стан
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Layers className="mr-2 h-4 w-4" />
            Шари
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Фільтри
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Карта об'єктів</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Navigation className="mr-2 h-4 w-4" />
                    Центрувати
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-full">
              {/* Map Placeholder */}
              <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: `
                      linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                      linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }} />
                </div>
                
                {/* Map objects */}
                <div className="relative w-full h-full">
                  {mapObjects.map((obj, index) => (
                    <div
                      key={obj.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{
                        left: `${30 + index * 20}%`,
                        top: `${40 + index * 15}%`
                      }}
                    >
                      <div className={`
                        w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all group-hover:scale-125
                        ${obj.status === 'active' ? 'bg-success' : 'bg-warning'}
                      `}>
                        <MapPin className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-[200px]">
                          <h4 className="font-medium text-foreground">{obj.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{obj.address}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge 
                              variant={obj.status === 'active' ? 'success' : 'warning'}
                              className="text-xs"
                            >
                              {obj.status === 'active' ? 'Активний' : 'ТО'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {obj.equipmentCount} об'єктів
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-lg font-medium">Інтерактивна карта</p>
                  <p className="text-sm">OpenStreetMaps інтеграція буде тут</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Objects List */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Об'єкти</CardTitle>
              <CardDescription>
                Список всіх об'єктів з поточним статусом
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Пошук об'єктів..."
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                {mapObjects.map((obj) => (
                  <div
                    key={obj.id}
                    className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{obj.name}</h4>
                      <Badge 
                        variant={obj.status === 'active' ? 'success' : 'warning'}
                        className="text-xs"
                      >
                        {obj.status === 'active' ? (
                          <>
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Активний
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            ТО
                          </>
                        )}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {obj.address}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <HardDrive className="h-3 w-3 text-muted-foreground" />
                        <span>{obj.equipmentCount} обладнання</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-muted-foreground" />
                        <span>{obj.activeIssues} проблем</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs text-muted-foreground">
                      Останнє ТО: {obj.lastMaintenance}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Легенда</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-success border border-white"></div>
                  <span className="text-sm">Активні об'єкти</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-warning border border-white"></div>
                  <span className="text-sm">На технічному обслуговуванні</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-destructive border border-white"></div>
                  <span className="text-sm">Аварійний стан</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}